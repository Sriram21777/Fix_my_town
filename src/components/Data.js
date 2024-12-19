export const Zonelist = {
  getData() {
    return [
      { name: "Arjunganj", code: "ZW" },
      { name: "Ar", code: "ZW" },
      { name: "Aranj", code: "ZW" },
      { name: "vrjunganj", code: "ZW" },
    ];
  },

  getCountries() {
    return Promise.resolve(this.getData());
  },
};
