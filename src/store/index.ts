// store.js
import { create } from 'zustand';

const useStore = create((set) => {
  return ({
    searchPlaceHolder: '',
    recommendProducts: [],
    firstLevelData: [],
    secondLevelData: [],
    thirdLevelData: [],
    FirstCategory: {},
    SecondCategory: {},
    ThirdCategory: {},
    activeCode: {},
    selectedFirst: '',
    selectedSecond: '',
    selectedThird: '',
    setLang: 'en',
    categoryCache: {},
    setLang: (lang) => set({ setLang: lang }),
    setFirstLevelData: (category) => set({ firstLevelData: category }),
    setSecondLevelData: (category) => set({ secondLevelData: category }),
    setThirdLevelData: (category) => set({ thirdLevelData: category }),
    setFirstCategory: (category) => set({ FirstCategory: category }),
    setSecondCategory: (category) => set({ SecondCategory: category }),
    setThirdCategory: (category) => set({ ThirdCategory: category }),
    setActiveCategory: (category) => set({ activeCode: category }),
    setSelectedFirst: (category) => set({ selectedFirst: category }),
    setSelectedSecond: (category) => set({ selectedSecond: category }),
    setSelectedThird: (category) => set({ selectedThird: category }),
    setSearchPlaceHolder: (category) => set({ searchPlaceHolder: category }),
    setRecommendProducts: (category) => set({ recommendProducts: category }),

    
  })
})

export default useStore;