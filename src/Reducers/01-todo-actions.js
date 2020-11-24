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
                  { data: { todo: data.text } },
                )
              )
              .then((ret) => {
                  console.log(ret)
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