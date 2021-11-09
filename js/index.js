/* menu */
let menu = {
    active: true,
    burgerBtn: document.querySelector(".menu__burger"),
    menuSlider: document.querySelector(".menu__slider"),
    menuHider: document.querySelector(".menu__hider"),
    menuCartBtn: document.querySelector(".menu__cart svg"),
    cart: document.querySelector(".cart"),
    cartContainer: document.querySelector(".cart__container"),
    cartContent: document.querySelector(".cart__content"),
    cartTotal: document.querySelector(".menu__cart-total"),
    cartBtn: document.querySelector(".cart__btn"),
    emptyCart: document.querySelector(".cart__empty"),
    deleteCartBtn: document.querySelector(".cart__delete"),
    burger() {
        this.burgerBtn.addEventListener("click", () => {
            this.active = !this.active;
            this.burgerBtn.classList.toggle("menu__burger--active");

            this.menuSlider.classList.toggle("menu__slider--active");

            this.menuHider.classList.toggle("menu__hider--active");

            if (!this.active) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });
    },
    menuCart() {
        this.menuCartBtn.addEventListener("click", () => {
            this.cart.classList.toggle("cart--active");
        });
    },
    cartEmpty() {
        if (menu.cartTotal.innerText === "0") {
            this.cartBtn.style.display = "none";
            this.emptyCart.classList.remove("cart__empty--active");
            this.cartTotal.classList.remove("menu__cart-total--active");
            this.cartContent.classList.remove("cart__content--active");
        } else {
            this.cartContent.classList.add("cart__content--active");
            this.emptyCart.classList.add("cart__empty--active");
            this.cartBtn.style.display = "block";
            this.cartTotal.classList.add("menu__cart-total--active");
        }
    },
    deleteCart() {
        this.deleteCartBtn.addEventListener("click", () => {
            let confirm = window.confirm("Do you want to delete all the items in your cart?");
            if (confirm) {
                shopping.totalInTheCart = [];
                menu.cartTotal.innerText = "0";
                let empty = this.cartEmpty.bind(this);
                empty();
            }
        })
    }
}


/* Carousel */
let carousel = {
    carouselBtns: document.querySelectorAll(".carousel__nav"),
    carouselSlider: document.querySelector(".carousel__slider"),
    carouselImg: document.querySelectorAll(".carousel__slider img"),
    carouselThumbnails: document.querySelectorAll(".carousel__thumbnails"),
    carouselThumbnailsImg: document.querySelectorAll(".carousel__thumbnails img"),
    lightBoxContainer: document.querySelector(".carousel__lightbox-container"),
    closeLightBox: document.querySelector(".carousel__close"),
    translateX: 0,
    index: 0,
    isLightBoxActive: false,
    slider() {
        this.carouselBtns.forEach(carouselBtn => {
            carouselBtn.addEventListener("click", () => {
                let activeClass = this.activeThumbnails.bind(this);
                let removeClass = this.removeActiveThumbnails.bind(this);
                if (carouselBtn.id === "prev" || carouselBtn.id === "prev-lightbox") {
                    if (this.index > 0) {
                        removeClass()
                        this.translateX += 100;
                        this.carouselImg.forEach(img => {
                            img.style.transform = `translateX(${this.translateX}%)`;
                            console.log(this.index)
                        });
                        this.index--;
                        this.carouselThumbnailsImg[this.index].classList.add("carousel__thumbnail--active");
                        this.carouselThumbnailsImg[this.index + 4].classList.add("carousel__thumbnail--active");
                    }
                } else {
                    if (this.index < (this.carouselImg.length / 2) - 1) {
                        removeClass();
                        this.translateX -= 100;
                        this.carouselImg.forEach(img => {
                            img.style.transform = `translateX(${this.translateX}%)`;
                            activeClass();
                        });
                        console.log(this.index)
                        this.index++;
                    }
                }
            });
        });
    },
    thumbnailSlider() {
        for (let i = 0; i < this.carouselThumbnailsImg.length; i++) {
            this.carouselThumbnailsImg[i].addEventListener("click", () => {
                this.carouselThumbnailsImg.forEach(thumbnail => {
                    thumbnail.classList.remove("carousel__thumbnail--active");
                });

                this.carouselImg.forEach(img => {
                    if (!this.isLightBoxActive) {
                        this.index = i - 4;
                        this.translateX = this.index * -100;
                        img.style.transform = `translateX(${this.translateX}%)`;
                        console.log("ok")
                        console.log(this.translateX)
                        this.carouselThumbnailsImg[i - (this.carouselImg.length / 2)].classList.add("carousel__thumbnail--active");
                        console.log(this.index)
                    } else {
                        this.index = i;
                        this.translateX = this.index * -100;
                        img.style.transform = `translateX(${this.translateX}%)`;
                        this.carouselThumbnailsImg[i].classList.add("carousel__thumbnail--active");
                        this.carouselThumbnailsImg[i + (this.carouselImg.length / 2)].classList.add("carousel__thumbnail--active");
                    }
                });
            });
        }
    },
    removeActiveThumbnails() {
        this.carouselThumbnailsImg.forEach(thumbnail => {
            thumbnail.classList.remove("carousel__thumbnail--active");
        });
    },
    activeThumbnails() {
        this.carouselThumbnailsImg[this.index + 1].classList.add("carousel__thumbnail--active");
        this.carouselThumbnailsImg[this.index + 5].classList.add("carousel__thumbnail--active");
        console.log(this.index + 5)

    },
    toggleLightbox() {
        this.carouselImg.forEach(img => {
            img.addEventListener("click", () => {
                this.isLightBoxActive = true;
                document.body.style.overflow = 'hidden';
                menu.menuHider.classList.add("menu__hider--active");
                this.lightBoxContainer.classList.add("carousel__lightbox-container--active");
            })
        });
        this.closeLightBox.addEventListener("click", () => {
            this.isLightBoxActive = false;
            document.body.style.overflow = 'auto';
            menu.menuHider.classList.remove("menu__hider--active");
            this.lightBoxContainer.classList.remove("carousel__lightbox-container--active");

        });
    }
}

/* Products */
let shopping = {
    indexProduct: 0,
    cartBtns: document.querySelectorAll(".container__cart-btns"),
    nmbOfProducts: document.querySelector(".container__amount"),
    discountedPrice: document.querySelector(".container__discounted-price"),
    originalPrice: document.querySelector(".container__original-price"),
    addToCartBtn: document.querySelector(".container__btn"),
    cartTotalText: document.querySelector(".cart__total"),
    price: 250,
    cartTotal: 0,
    itemsToAdd: [],
    totalInTheCart: [],
    addToCart() {
        let discountedPrice = (this.price / 2).toFixed(2);
        this.originalPrice.innerText = `$${this.price.toFixed(2)}`;
        this.discountedPrice.innerText = `$${discountedPrice}`;


        this.cartBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                if (btn.id === "less") {
                    if (this.nmbOfProducts.innerText !== "0") {
                        this.indexProduct--;
                        this.nmbOfProducts.innerText = this.indexProduct;
                        this.cartTotal -= this.reducedPrice;
                        this.itemsToAdd.pop(discountedPrice);

                    }
                } else {
                    this.indexProduct++;
                    this.nmbOfProducts.innerText = this.indexProduct;
                    this.cartTotal += this.reducedPrice;
                    this.itemsToAdd.push(parseInt(discountedPrice));
                }
            })
        });

        this.addToCartBtn.addEventListener("click", () => {
            if (this.nmbOfProducts.innerText !== "0") {
                this.totalInTheCart.push(...this.itemsToAdd);
                menu.cartTotal.innerText = this.totalInTheCart.length;
                this.cartTotalText.innerHTML = `$${(shopping.price / 2).toFixed(2)} x ${this.totalInTheCart.length} <b>$${this.totalAmount()}</b>`;
                this.nmbOfProducts.innerHTML = 0;
                this.indexProduct = 0;
                this.itemsToAdd = [];
                menu.cartEmpty();
            }
        });
    },
    totalAmount() {
        const reducer = (previousValue, currentValue) => previousValue + currentValue;
        const sum = this.totalInTheCart.reduce(reducer);
        return sum;
    }
}

carousel.slider();
carousel.thumbnailSlider();
carousel.toggleLightbox();
menu.burger();
menu.menuCart();
menu.deleteCart()
shopping.addToCart();
