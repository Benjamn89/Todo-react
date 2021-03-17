// FaunaDB keys
import {keys} from '../Config/config'
import faunadb from 'faunadb'
const q = faunadb.query;
const client = new faunadb.Client({
    secret: keys.fauna
  })

const actionTypes = {
    tryLogTheUser: (obj) => {
        return dispatch => {
          client.query(
            q.Login(
              q.Match(q.Index("user_exists"), obj.email),
              { password: obj.pass },
            )
          ).then(() => {
            const now = new Date()
            const objForLocal = {
              value: 'OK',
              expiry: now.getTime() + 3600000,
              userName: obj.email
            }
            localStorage.setItem('todo', JSON.stringify(objForLocal))
           dispatch(actionTypes.logSuccess())
          })
          .catch(() => dispatch(actionTypes.loginFailed()))
        }
    },
    userExists: (userData) => {
      return dispatch => {
          client.query(q.Paginate(q.Match(q.Index('user_exists'), userData.email)))
            .then((ret) => {
                if (ret.data.length > 0) {
                    console.log('User exists')
                    dispatch(actionTypes.regFailed())
                } else {
                  console.log('Promise all now')
                  Promise.all([
                    client.query(q.Create(q.Collection('users'),{credentials: { password: userData.pass },data: {username: userData.email, displayName: userData.displayName}})),
                    client.query(q.CreateCollection({ name: userData.displayName }))
                  ])
                    .then(() => {
                      console.log('Sending regSuccess and creating doc')
                      dispatch(actionTypes.regSuccess())
                      client.query(q.Create(q.Collection(userData.email),{ data: { date: '1.1', todo: [] } },))
                      .then(() => {
                        client.query(q.CreateIndex({name: userData.email, source: q.Collection(userData.email),terms: [{ field: ['data', 'date'] }],}))
                        .then(() => { console.log('Index was created') })
                        .catch((err) => console.log(err))
                      })
                    })
                } }).catch((err) => console.log(err))
      }
  },
    changeLoginBox: (stateName) => {
      return {type: 'changeState', stateName}
  },
    regFailed: () => {
   return {type: 'regFailed'}
    },
    removeErr: () => {
      return {type: 'removeErr'}
    },
    showSpinner: () => {
      return {type: 'spinnerOn'}
    },
    regSuccess: () => {
      return {type: 'regSuccess'}
    },
    typeEmail: (val) => {
      return {type: 'typeEmail', val}
    },
    typePass: (val) => {
      return {type: 'typePass', val}
    },
    logSuccess: () => {
      return {type: 'loginSuccess'}
    },
    loginFailed: () => {
      return {type: 'loginFailed'}
    },
    logOut: () => {
      return {type: 'log-out'}
    }
}
export default actionTypes