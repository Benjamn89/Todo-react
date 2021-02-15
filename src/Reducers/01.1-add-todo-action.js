// FaunaDB keys
import {keys} from '../Config/config'
import faunadb from 'faunadb'
const q = faunadb.query;
const client = new faunadb.Client({
    secret: keys.fauna
  })

const actionTypes = {
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
    updateArrayDb: (data) => {
        return dispatch => {
            client.query(
                q.Update(
                  q.Ref(q.Collection(data.userName), data.ref),
                  { data: {todo : data.todoArray} },
                )
              )
              .then(() => {
                  if (data.noRender === true) {return}
                  dispatch(actionTypes.submitDone(data.todoArray))
              }).catch(err => console.log(err))
        }
    },
    updateArrayDbTest: () => {
     return dispatch => {
         Promise.all([client.query(
            q.Update(
              q.Ref(q.Collection(data.userName), data.ref),
              { data: {todo : data.todoArray} },
            )
          ),client.query(
            q.Update(
              q.Ref(q.Collection('tll-todos'), '290619774910595589'),
              { data: {test : 'test'} },
            )
          )])
     }
    },
    submitDone: (todoArray) => {
        return {
            type: 'submit-done',
            todoArray
        }
    },
    setHold: () => {
        return {
            type: 'set-hold'
        }
    },
    toggleTodo: (condition) => {
        if (condition) {
            return dispatch => {
                setTimeout(() => {
                 dispatch(actionTypes.toggleTodo(false))
                }, 200)
            }
        }
        return {
            type: 'toggle-todo'
        }
    },
}


export default actionTypes