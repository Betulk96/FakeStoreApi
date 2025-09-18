"use client"
import { CardProductProps } from "@/components/detail/DetailClient";
/*  bir Sepet (Cart) Context API yapısı oluşturmak için kullanılan bir React uygulamasının parçasıdır. Context API, bileşenler arasında veri paylaşımını kolaylaştıran bir yöntemdir ve bu örnekte sepetle ilgili verilerin tüm bileşenlerde kullanılabilmesi için kullanılmıştır. */

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface CartContextProps {
    productCartQty: number //sepetteki ürün sayısı
    cartPrdcts: CardProductProps[] | null //ürün listesi
    addToBasket: (product: CardProductProps) => void //ürün ekleme
    addToBasketIncrease: (product: CardProductProps) => void //sepetteki ürün artırma
    addToBasketDecrease: (product: CardProductProps) => void //sepetteki ürün azaltma
    removeFromCart: (product: CardProductProps) => void //sepetteki ürün silme
    removeCart: () => void //sepetteki ürün listesini sıfırlama
}
const CartContext = createContext<CartContextProps | null>(null)
/* createContext=> React bileşenleri genellikle birbirlerinden bağımsız çalışır. Ancak bazen, bir bileşen tarafından yönetilen veriye, çok sayıda bileşenin erişmesi gerekebilir. Bu tür durumlarda Context API kullanılarak, bir "global state" oluşturulabilir ve bu veriler, uygulamanın herhangi bir yerinden erişilebilir hale getirilebilir. */


interface Props {
    [propName: string]: any
}
export const CartContextProvider = (props: Props) => {
    const [productCartQty, setProductCartQty] = useState(0) //sepetteki ürün sayısı
    const [cartPrdcts, setCartPrdcts] = useState<CardProductProps[] | null>(null) //ürün listesi


    useEffect(() => {
        let getItem: any = localStorage.getItem('cart')
        let getItemParse: CardProductProps[] | null = JSON.parse(getItem)
        setCartPrdcts(getItemParse)
    }, [])
    /* useEffect: Sayfa yüklendiğinde, yerel depolama (localStorage) kontrol edilir 
    ve cart adlı veriyi alarak sepetteki ürünleri cartPrdcts state'ine set eder. */
    //useCallback, React Hook'larından biridir ve fonksiyonun bellekte yeniden oluşturulmasını önlemek amacıyla kullanılır.
    const addToBasketIncrease = useCallback((product: CardProductProps) => {

        let updatedCart;
        if (product.quantity == 10) {
            return toast.error('Daha fazla ekleyemezsin...')
        }
        if (cartPrdcts) {
            updatedCart = [...cartPrdcts];
            const existingItem = cartPrdcts.findIndex(item => item.id === product.id)

            if (existingItem > -1) {
                updatedCart[existingItem].quantity = ++updatedCart[existingItem].quantity
            }
            setCartPrdcts(updatedCart)
            localStorage.setItem('cart', JSON.stringify(updatedCart))
        }
    }, [cartPrdcts])

    const addToBasketDecrease = useCallback((product: CardProductProps) => {
        let updatedCart;
        if (product.quantity == 1) {
            return toast.error('Daha az ekleyemezsin...')
        }
        if (cartPrdcts) {
            updatedCart = [...cartPrdcts];
            const existingItem = cartPrdcts.findIndex(item => item.id === product.id)

            if (existingItem > -1) {
                updatedCart[existingItem].quantity = --updatedCart[existingItem].quantity
            }
            setCartPrdcts(updatedCart)
            localStorage.setItem('cart', JSON.stringify(updatedCart))
        }
    }, [cartPrdcts])

    const removeCart = useCallback(() => {
        setCartPrdcts(null)
        toast.success('Sepet Temizlendi...')
        localStorage.setItem('cart', JSON.stringify(null))
    }, [])

    const addToBasket = useCallback((product: CardProductProps) => {
        setCartPrdcts(prev => {
            let updatedCart;
            if (prev) {
                updatedCart = [...prev, product]
            } else {
                updatedCart = [product]
            }
            toast.success('Ürün Sepete Eklendi...')
            localStorage.setItem('cart', JSON.stringify(updatedCart))
            return updatedCart
        })
    }, [cartPrdcts])

    const removeFromCart = useCallback((product: CardProductProps) => {
        if (cartPrdcts) {
            const filteredProducts = cartPrdcts.filter(cart => cart.id !== product.id)

            setCartPrdcts(filteredProducts)
            toast.success('Ürün Sepetten Silindi...')
            localStorage.setItem('cart', JSON.stringify(filteredProducts))
        }
    }, [cartPrdcts])

    let value = {
        productCartQty,
        addToBasket,
        cartPrdcts,
        removeFromCart,
        removeCart,
        addToBasketIncrease,
        addToBasketDecrease
    }
    return (
        <CartContext.Provider value={value} {...props} />
    )
}


const UseCart = () => {
    const context = useContext(CartContext)
    if (context == null) {
        throw new Error('Bir hata durumu mevcut')
    }
    return context;//tüm sayfalarda kullanılabilir.

}

export default UseCart

/* Bu yapı, React Context API kullanarak sepet işlemlerini merkezi bir noktada yönetir. Sepetle ilgili ürün ekleme, çıkarma, artırma, azaltma ve temizleme işlemleri tüm bileşenler tarafından erişilebilir. localStorage sayesinde, sepet verisi tarayıcıda kalıcı hale gelir ve sayfa yenilendiğinde kaybolmaz. */