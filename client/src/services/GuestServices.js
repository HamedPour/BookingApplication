import Api from "./Api";

export default {
  index() {
    return Api().get("guests");
  },

  create(metadata) {
    return Api().post("guests", metadata);
  },
};
