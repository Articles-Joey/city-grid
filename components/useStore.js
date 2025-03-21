import { create } from 'zustand'

const useStore = create((set) => ({

    quantity: 1,
    setQuantity: (value) => set(() => ({ quantity: value })),

    autoRotate: true,
    setAutoRotate: (value) => set(() => ({ autoRotate: value })),

}))

export default useStore