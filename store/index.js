const req = p =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(p);
    }, 2000);
  });

export const state = () => ({
  sorting: ["sooner", "later"],

  items: [
    {
      id: 1,
      header: "Header 1",
      text: "some text on card",
      like: false,
      category: ["music"],
      date: 1593702117125
    },
    {
      id: 2,
      header: "Header 2",
      text: "some text on card",
      like: false,
      category: ["art", "music"],
      date: 1593701617925
    },
    {
      id: 3,
      header: "Header 3",
      text: "some text on card",
      like: false,
      category: ["film"],
      date: 1593701617925
    },
    {
      id: 4,
      header: "Header 4",
      text: "some text on card",
      like: false,
      category: ["game"],
      date: 1593702117325
    },
    {
      id: 5,
      header: "Header 5",
      text: "some text on card",
      like: false,
      category: ["music"],
      date: 1593702114425
    },
    {
      id: 6,
      header: "Header 6",
      text: "some text on card",
      like: false,
      category: ["art", "music"],
      date: 1513701617925
    },
    {
      id: 7,
      header: "Header 7",
      text: "some text on card",
      like: false,
      category: ["film"],
      date: 1593741617925
    },
    {
      id: 8,
      header: "Header 8",
      text: "some text on card",
      like: false,
      category: ["game"],
      date: 1593702613925
    },
    {
      id: 9,
      header: "Header 9",
      text: "some text on card",
      like: false,
      category: ["music"],
      date: 1543702117125
    },
    {
      id: 10,
      header: "Header 10",
      text: "some text on card",
      like: false,
      category: ["art", "music"],
      date: 1591701617925
    },
    {
      id: 11,
      header: "Header 11",
      text: "some text on card",
      like: false,
      category: ["film"],
      date: 1593401617925
    },
    {
      id: 12,
      header: "Header 12",
      text: "some text on card",
      like: false,
      category: ["game"],
      date: 1593701617925
    }
  ]
});
export const mutations = {
  LIKE_ITEM(state, { id, value }) {
    const ind = state.items.findIndex(el => el.id === id);
    if (ind > 0) state.items[ind].like = value;
  }
};

export const actions = {
  async API_LIKE({ commit }, p) {
    try {
      const response = await req(p);
      commit("LIKE_ITEM", p);
    } catch (error) {
      throw error;
    }
  }
};
