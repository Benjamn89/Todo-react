// FaunaDB keys
import {keys} from '../Config/config'
import faunadb from 'faunadb'
const q = faunadb.query;
const client = new faunadb.Client({
    secret: keys.fauna
  })

  const actionTypes = {
    fetchTodos: () => {
        return dispatch => {
            setTimeout(() => {
                dispatch(actionTypes.fetchingResult('nothing'))
            }, 500)
        }
    },
    fetchingResult: (res) => {
        return {
            type: res
        }
    },
    checkDate: (user) => {
      return dispatch => {
          client.query(
              q.Get(
                  q.Match(
                      q.Index(user.user),
                      user.date
                  )
              )
          ).then((ret) => {
              console.log('Date was founded, Save the ref and retriving the data')
              dispatch(actionTypes.setRef(ret.ref.value.id))
              client.query(
                q.Get(q.Ref(q.Collection(user.user), ret.ref.value.id))
              )
              .then((ret) => {
                console.log(ret.data)
              })
              
          }).catch(() => {
              console.log('New date has been created')
              client.query(
                q.Create(
                  q.Collection(user.user),
                  { data: { date: user.date } },
                )
              ).then((ret) => {
                  dispatch(actionTypes.setRef(ret.ref.value.id))
              }).catch((err) => {
                  console.log(err)
              })
          })
      }
    },
    setRef: (ref) => {
        return {
            type: 'set-ref',
            ref
        }
    },
    submitDone: () => {
        return {
            type: 'submit-todo'
        }
    },
    logOut: () => {
        return {
            type: 'log-out'
        }
    }
  }

  export default actionTypes