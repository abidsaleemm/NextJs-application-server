import fetchApi from "../helpers/fetchApi";

export default store => next => action => {
  if(/SETTINGS$/.test(action.type)) {
    fetchApi("settings", action ).catch(error => {
        console.log("oops",error)
    });
  }
  let result = next(action)
 return result
}
