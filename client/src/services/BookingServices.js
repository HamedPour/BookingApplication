import Api from "./Api";

export default {
  store(metadata) {
    return Api().post("booking", metadata);
  },
};
