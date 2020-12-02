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
              console.log(ret)
            // client.query(
            //     q.Get(q.Ref(q.Collection(user.user), ret.ref.value.id))
            //   )
            //   .then((ret) => console.log(ret))
          }).catch(() => {
              dispatch(actionTypes.fetchingResult('nothing'))
          })
      }
    },
    toggleTodo: () => {
        return {
            type: 'toggle-todo'
        }
    },
    updateTextArea: (data) => {
        return {
            type: 'updateTextArea',
            textValue: data.textValue,
            submitOn: data.submitOn
        }
    },
    closeTodo: (val) => {
        return {
            type: 'close-todo',
            val
        }
    },
    submitTodo: (data) => {
        return dispatch => {
            client.query(
                q.Create(
                  q.Collection(data.userName),
                  { data: { date: data.date } },
                )
              )
              .then((ret) => {
                  dispatch(actionTypes.submitDone())
              })
        }
    },
    submitDone: () => {
        return {
            type: 'submit-todo'
        }
    },
    setHold: () => {
        return {
            type: 'set-hold'
        }
    }
  }

  export default actionTypes