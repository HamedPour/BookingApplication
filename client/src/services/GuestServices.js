import Api from "./Api";

export default {
  index() {
    return Api().get("guests");
  },
  delete(anID) {
    return Api().delete("guests/" + JSON.stringify(anID));
  },
};
