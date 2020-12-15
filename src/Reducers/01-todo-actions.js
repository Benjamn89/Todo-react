// FaunaDB keys
import {keys} from '../Config/config'
import faunadb from 'faunadb'
const q = faunadb.query;
const client = new faunadb.Client({
    secret: keys.fauna
  })

  const actionTypes = {
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
              dispatch(actionTypes.setOnlyRef(ret.ref.value.id))
              client.query(
                q.Get(q.Ref(q.Collection(user.user), ret.ref.value.id))
              )
              .then((ret) => {
                if (ret.data.todo.length < 1) {
                    dispatch(actionTypes.noResults())
                }
              })
              
          }).catch(() => {
              console.log('New date has been created')
              client.query(
                q.Create(
                  q.Collection(user.user),
                  { data: { date: user.date, todo: [] } },
                )
              ).then((ret) => {
                  const data = {
                      ref: ret.ref.value.id,
                      todo: ret.data.todo
                  }
                  dispatch(actionTypes.setRef(data))
              }).catch((err) => {
                  console.log(err)
              })
          })
      }
    },
    setRef: (data) => {
        return {
            type: 'set-ref',
            ref: data.ref,
            todo: data.todo 
        }
    },
    setOnlyRef: (ref) => {
      return {
          type:'set-only-ref',
          ref
      }  
    },
    logOut: () => {
        return {
            type: 'log-out'
        }
    },
    noResults: () => {
        return {
            type: 'no-results'
        }
    }
  }

  export default actionTypes