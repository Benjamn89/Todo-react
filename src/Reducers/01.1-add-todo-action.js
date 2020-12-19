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
    submitTodo: (data) => {
        return dispatch => {
            client.query(
                q.Update(
                  q.Ref(q.Collection(data.userName), data.ref),
                  { data: {todo : data.todoArray} },
                )
              )
              .then(() => {
                  dispatch(actionTypes.submitDone(data.todoArray))
              }).catch(err => console.log(err))
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
    toggleTodo: () => {
        return {
            type: 'toggle-todo'
        }
    },
}


export default actionTypes