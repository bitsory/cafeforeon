import order_confirm from "./oder_confirm.js";

export default class {
    constructor(param_user_id) {
        document.title = "Cafe FORE";
        console.log("place order page");
      

        this.user_id = param_user_id;
        console.log(`user_id : ${this.user_id}`);
        
   
    }



    // proceedSelector() {
    //     this.$proceed_order_btn = document.querySelector('.proceed_order_btn');    
    //     this.$cancel_proceed_order_btn = document.querySelector('.cancel_proceed_order_btn');
    // }

    // proceedEventListener () {
    //     this.$proceed_order_btn.addEventListener('click', (event)=> {
    //         let check_out_cart = '';


    //         const orderConfirm = new order_confirm();
    //         console.log(this.user_id)
                       
    //         if(this.user_id === 'GUEST') {
    //             check_out_cart = localStorage.getItem('cart');
    //             console.log(check_out_cart)
                


    //             document.querySelector(".online_main").innerHTML = orderConfirm.getGuestOrderConfirm();
    //             orderConfirm.makeGuestCheckOutForm(g_total); 
    //         } else {
    //             document.querySelector(".online_main").innerHTML = orderConfirm.getUserOrderConfirm();
    //             orderConfirm.makeUserCheckOutForm(this.user_id, g_total);
    //         }
    //     });
        
    //     this.$cancel_proceed_order_btn.addEventListener('click', (event)=> {
    //         window.history.back();
    //     });


    // }

    getOrder() {
            
               
        return `
        <div class="online_place_order_container">
            <h2>Your Order</h2>
            
            <div id="online_place_order_item_container" class="online_place_order_item_container">
            </div>
        </div>
        <div class="online_place_order_item_proceed">
            <h2>Would you like proceed your order?</h2>            
            <div class='grand_total'></div>

            <button class='proceed_order_btn'>GO FOR IT</button>
            <button class='cancel_proceed_order_btn'>No Thanks</button>
        </div>
        
        `

    };

    getOrderDetail(order_list, order_cart) {
        console.log("get order detail.js");
        console.log(order_list);
        console.log(order_cart);
        user_id = this.user_id;
        const orderItemContainer_test = document.createElement('div');
        orderItemContainer_test.setAttribute('class', `orderItemContainer_test`);
        document.querySelector('.online_place_order_item_container').appendChild(orderItemContainer_test);
        document.querySelector(`.orderItemContainer_test`).innerText = 'test';
        let total_amount = 0;
        
        if(order_list.length) { 
            order_list.forEach(element => {

                let price = element.price_sell;
                let quantity = (user_id === "GUEST") ? 
                    (order_cart.filter(item => {
                    return item.c_item_name === element.name})[0].c_item_quantity) : element.quantity;
                
                setOrderItemContainer(element.prodnum, element.price_sell, element.name, quantity, element.image);
                
                // setOrderItemContainer(element.prodnum, element.price_sell, element.name, 
                //     (this.user_name === "GUEST") ? 
                //     (order_cart.filter(item => {
                //         return item.c_item_name === element.name})[0].c_item_quantity)  
                //     : element.quantity                           
                //     , element.image);
                total_amount = total_amount + (price * quantity);
                console.log(`total_amount : ${total_amount}`);
            });
            g_total = total_amount;
            tmp_order_cart = order_cart;
    
            if (total_amount !=0) getGrandTotal(total_amount);
            
            console.log(`tmp_order_cart : `)
            console.log(`${tmp_order_cart}`)
        
        } else {

            document.querySelector('.online_main').innerHTML = 
            `Your Cart is empty<br><br>
            Sign in to your account<br>
            Sign up now
            `;
        }

        
        

    }
          
    
}

let user_id = '';
let g_total = 0;
let tmp_order_cart = {};


function setOrderItemContainer(prodnum, price, name, quantity, image) {
    const orderItemContainer = document.createElement('div');
    orderItemContainer.setAttribute('id', `online_place_order_item`);
    orderItemContainer.setAttribute('class', `online_place_order_item`);
    orderItemContainer.setAttribute('itemid', `${prodnum}`);

    document.querySelector('.online_place_order_item_container').appendChild(orderItemContainer);
        
    setOrderItemCheckBtn(prodnum);
    setOrderItemImageContainer(prodnum, image);
    setOrderItemContentContainer(prodnum, price, name, quantity);
    
}


function setOrderItemCheckBtn(prodnum) {
    const orderItemCheckBtn = document.createElement('input');
    orderItemCheckBtn.setAttribute('type', `checkbox`);
    orderItemCheckBtn.setAttribute('id', `online_place_order_item_check_btn`);     
    orderItemCheckBtn.setAttribute('class', `online_place_order_item_check_btn`);
    orderItemCheckBtn.setAttribute('name', `online_place_order_item_check_btn`);
    orderItemCheckBtn.setAttribute('checked_itemid', `${prodnum}`);     
    document.querySelector(`[itemid="${prodnum}"]`).appendChild(orderItemCheckBtn);
    orderItemCheckBtn.checked = true;
}

function setOrderItemContentContainer(prodnum, price, name, quantity) {
    const orderItemContentContainer = document.createElement('div');
    orderItemContentContainer.setAttribute('class', `online_place_order_item_content`);
    orderItemContentContainer.setAttribute('contents-data-itemid',`${prodnum}`);
    document.querySelector(`[itemid="${prodnum}"]`).appendChild(orderItemContentContainer);
    setOrderItemName(prodnum, name)
    setOrderItemDelete(prodnum)
    setOrderItemPrice(prodnum, price)
    setMinusQuantity(prodnum)
    setOrderItemQuantity(prodnum, quantity)
    setPlusQuantity(prodnum)
    getSubTotal(prodnum)

    

}



function setOrderItemImageContainer(prodnum, image_src) {
    const orderItemImageContainer = document.createElement('div');
    orderItemImageContainer.setAttribute('class', `online_place_order_item_pic_container`);
    orderItemImageContainer.setAttribute('image-itemid',`${prodnum}`);                    
    document.querySelector(`[itemid="${prodnum}"]`).appendChild(orderItemImageContainer);
    
    setOrderItemLink(prodnum, image_src);
    
    // setItemName(prodnum, item_name);
    // setItemPrice(prodnum, item_price);
    
}



function setOrderItemLink(prodnum, image_src) {
    const orderItemLink = document.createElement('a');
    orderItemLink.setAttribute('class', `online_place_order_item_link`);  
    orderItemLink.setAttribute('link-data-itemid', `${prodnum}`);  
    // ItemLink.setAttribute('href', '/shop/view/item/' + prodnum);
    document.querySelector(`[image-itemid="${prodnum}"]`).appendChild(orderItemLink);
    
    setOrderItemImage(prodnum, image_src);
    // setItemPrice(prodnum, item_price);
    // setItemName(prodnum, item_name);
    
     
}

function setOrderItemImage(prodnum, image_src) {
    const orderItemImage = document.createElement('img');
    orderItemImage.setAttribute('class', `online_place_order_item_pic`);
    orderItemImage.setAttribute('src', image_src);
    document.querySelector(`[link-data-itemid="${prodnum}"]`).appendChild(orderItemImage);
}

function setOrderItemNumber(prodnum) {
    const orderItemNumber = document.createElement('div');
    orderItemNumber.setAttribute('class', `online_place_order_item_number`);
    document.querySelector(`.online_place_order_item_contatiner.o${prodnum}`).appendChild(orderItemNumber);
    document.querySelector(`.online_place_order_item_number.o${prodnum}`).innerText = prodnum;
}

function setOrderItemName(prodnum, item_name) {
    const orderItemName = document.createElement('div');
    orderItemName.setAttribute('class', `online_place_order_item_name`);
    document.querySelector(`[contents-data-itemid="${prodnum}"]`).appendChild(orderItemName);
    orderItemName.innerText = item_name;
}

function setOrderItemPrice(prodnum, item_price) {
    const orderItemPrice = document.createElement('div');
    orderItemPrice.setAttribute('class', `online_place_order_item_price`);
    orderItemPrice.setAttribute('price-itemid',`${prodnum}`);    
    document.querySelector(`[contents-data-itemid="${prodnum}"]`).appendChild(orderItemPrice);
    orderItemPrice.innerText = '$'+item_price;
}

function setOrderItemQuantity(prodnum, item_quantity) {
    const orderItemQuantity = document.createElement('div');
    orderItemQuantity.setAttribute('class', `online_place_order_item_quantity`);
    orderItemQuantity.setAttribute('quantity-itemid',`${prodnum}`);   
    document.querySelector(`[contents-data-itemid="${prodnum}"]`).appendChild(orderItemQuantity);    
    orderItemQuantity.innerText = item_quantity;
   
}

function setPlusQuantity(prodnum) {
    const plusQuantityBtn = document.createElement('button');
    plusQuantityBtn.setAttribute('class', `online_place_order_item_plus_quantity_btn`);
    document.querySelector(`[contents-data-itemid="${prodnum}"]`).appendChild(plusQuantityBtn);
    plusQuantityBtn.innerText = '+'; 
}

function setMinusQuantity(prodnum) {
    const minusQuantityBtn = document.createElement('button');
    minusQuantityBtn.setAttribute('class', `online_place_order_item_minus_quantity_btn`);
    document.querySelector(`[contents-data-itemid="${prodnum}"]`).appendChild(minusQuantityBtn);
    minusQuantityBtn.innerText = '-';
}

function setOrderItemDelete(prodnum) {
    const orderItemDeleteBtn = document.createElement('button');
    orderItemDeleteBtn.setAttribute('class', `online_place_order_item_delete_btn`);
    document.querySelector(`[contents-data-itemid="${prodnum}"]`).appendChild(orderItemDeleteBtn);
    orderItemDeleteBtn.innerText = 'X';
}

function getSubTotal(prodnum) {
    const orderSubTotal = document.createElement('div');
    orderSubTotal.setAttribute('class', `online_place_order_item_subtotal`);
    orderSubTotal.setAttribute('subtotal-itemid', `${prodnum}`);
    const item_quantity = parseInt(document.querySelector(`[quantity-itemid="${prodnum}"]`).innerText);
    const item_price = parseFloat(document.querySelector(`[price-itemid="${prodnum}"]`).innerText.slice(1)); 

    const item_subtotal = parseFloat(item_quantity * item_price); 
    console.log(item_quantity);
    console.log(item_price);
    console.log(item_subtotal);

    document.querySelector(`[contents-data-itemid="${prodnum}"]`).appendChild(orderSubTotal);
    orderSubTotal.innerText = '$' +item_subtotal.toFixed(2);

}

function getGrandTotal(amount) {
    const orderGrandTotal = document.createElement('div');
    orderGrandTotal.setAttribute('class', `online_place_order_item_grandtotal`);

    // const item_orderGrandTotal = 1000;
    // const item_orderGrandTotal = parseFloat(document.querySelector(`.online_place_order_item_subtotal.o${}`).innerTextslice(1));
    document.querySelector(`.grand_total`).appendChild(orderGrandTotal);
    document.querySelector(`.online_place_order_item_grandtotal`).innerText = 'Total $' + amount.toFixed(2);
    


}


document.addEventListener('click',function(e){  
    
    if(e.target && (e.target.className) == 'online_place_order_item_plus_quantity_btn') {
        let item_number = e.target.parentElement.getAttribute('contents-data-itemid');
        let item_quantity_id = document.querySelector(`[quantity-itemid="${item_number}"]`);
        let item_quantity = parseInt(item_quantity_id.innerText);

        item_quantity_id.innerText = item_quantity + 1;        

        const item_new_quantity = parseInt(item_quantity_id.innerText);
        const item_price = parseFloat(document.querySelector(`[price-itemid="${item_number}"]`).innerText.slice(1)); 

        const item_subtotal = parseFloat(item_new_quantity * item_price);
        document.querySelector(`[subtotal-itemid="${item_number}"]`).innerText = '$'+item_subtotal.toFixed(2);
       
        //////user cart add up
        if (user_id === 'GUEST') {
        
            /////////////guest cart add up
            console.log(`tmp_order_cart : ${tmp_order_cart}`);
            tmp_order_cart.forEach(element => {
                console.log(element);

                if (element.c_item_no === item_number) {
                    console.log(item_number)
                    element.c_item_quantity++;
                }
            })

            localStorage.setItem("cart", JSON.stringify(tmp_order_cart));
        
        } else {
            let data = {
                u_id : user_id,
                item_num : item_number
            };

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    
                    },
                body: JSON.stringify(data)
            };
            console.log(data);

            fetch(`/item_addup`, options)
            
            .then((res) => res.json())
            .then(result => { console.log(result)})

        }

       
       /// rerendering total
        console.log(`g_total : ${g_total}`)
        const new_grandtotal = g_total + item_price;
        g_total = new_grandtotal;
        document.querySelector('.online_place_order_item_grandtotal').innerText = '$' + new_grandtotal.toFixed(2);


    }

    if(e.target && (e.target.className) == 'online_place_order_item_minus_quantity_btn') { // item quantity subtract
        console.log("online_place_order_item_minus_quantity_btn");
        let item_number = e.target.parentElement.getAttribute('contents-data-itemid');
        console.log(item_number);
        let item_quantity_id = document.querySelector(`[quantity-itemid="${item_number}"]`);
        let item_quantity = parseInt(item_quantity_id.innerText);

        // let item_quantity = parseInt(document.querySelector(`.online_place_order_item_quantity.o${item_number}`).innerText);
        if (item_quantity > 1) {
            item_quantity_id.innerHTML = item_quantity - 1;
            const item_new_quantity = parseInt(item_quantity_id.innerText);
            const item_price = parseFloat(document.querySelector(`[price-itemid="${item_number}"]`).innerText.slice(1)); 

            const item_subtotal = parseFloat(item_new_quantity * item_price);
            document.querySelector(`[subtotal-itemid="${item_number}"]`).innerText = '$'+item_subtotal.toFixed(2);


            if (user_id === 'GUEST') {
            
                /////////////guest cart subtract
                console.log(`tmp_order_cart : ${tmp_order_cart}`);
                tmp_order_cart.forEach(element => {
                    console.log(element);

                    if (element.c_item_no === item_number) {
                        console.log(item_number)
                        element.c_item_quantity--;
                    }
                })

                localStorage.setItem("cart", JSON.stringify(tmp_order_cart));            
            
            } else {
                let data = {
                    u_id : tmp_order_cart.c_id,
                    item_num : item_number
                };

                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                        
                        },
                    body: JSON.stringify(data)
                };
                console.log(data);

                fetch(`/item_subtract`, options)
               
                .then((res) => res.json())
                .then(result => { console.log(result)})

            }

            console.log(`g_total : ${g_total}`)
            const new_grandtotal = g_total - item_price;
            g_total = new_grandtotal;
            document.querySelector('.online_place_order_item_grandtotal').innerText = '$' + new_grandtotal.toFixed(2);
        }
    }
    
    /*
    if(e.target && (e.target.className).slice(0,-1) == 'online_place_order_item_plus_quantity_btn o') { // item quantity add
         
        console.log("online_place_order_item_plus_quantity_btn");
        let item_number = (e.target.className).slice(-1);
        let item_quantity = parseInt(document.querySelector(`.online_place_order_item_quantity.o${item_number}`).innerText);
        document.querySelector(`.online_place_order_item_quantity.o${item_number}`).innerHTML = item_quantity + 1;
        

        const item_new_quantity = parseInt(document.querySelector(`.online_place_order_item_quantity.o${item_number}`).innerText);
        const item_price = parseFloat(document.querySelector(`.online_place_order_item_price.o${item_number}`).innerText.slice(1)); 

        const item_subtotal = parseFloat(item_new_quantity * item_price);
        document.querySelector(`.online_place_order_item_subtotal.o${item_number}`).innerText = '$'+item_subtotal.toFixed(2);
       
        //////user cart add up
        if (user_id === 'GUEST') {
        
            /////////////guest cart add up
            console.log(`tmp_order_cart : ${tmp_order_cart}`);
            tmp_order_cart.forEach(element => {
                console.log(element);

                if (element.c_item_no === item_number) {
                    console.log(item_number)
                    element.c_item_quantity++;
                }
            })

            localStorage.setItem("cart", JSON.stringify(tmp_order_cart));

        
        
        } else {
            let data = {
                u_id : user_id,
                item_num : item_number
            };

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    
                    },
                body: JSON.stringify(data)
            };
            console.log(data);

            fetch(`/item_addup`, options)
            
            .then((res) => res.json())
            .then(result => { console.log(result)})

        }

       
       /// rerendering total
        console.log(`g_total : ${g_total}`)
        const new_grandtotal = g_total + item_price;
        g_total = new_grandtotal;
        document.querySelector('.online_place_order_item_grandtotal').innerText = '$' + new_grandtotal.toFixed(2);
        

    }

    

    if(e.target && (e.target.className).slice(0,-1) == 'online_place_order_item_minus_quantity_btn o') { // item quantity subtract
        console.log("online_place_order_item_minus_quantity_btn");
        let item_number = (e.target.className).slice(-1);
        console.log(item_number);
        let item_quantity = parseInt(document.querySelector(`.online_place_order_item_quantity.o${item_number}`).innerText);
        if (item_quantity > 1) {
            document.querySelector(`.online_place_order_item_quantity.o${item_number}`).innerHTML = item_quantity - 1;
            const item_new_quantity = parseInt(document.querySelector(`.online_place_order_item_quantity.o${item_number}`).innerText);
            const item_price = parseFloat(document.querySelector(`.online_place_order_item_price.o${item_number}`).innerText.slice(1)); 

            const item_subtotal = parseFloat(item_new_quantity * item_price);
            document.querySelector(`.online_place_order_item_subtotal.o${item_number}`).innerText = '$'+item_subtotal.toFixed(2);


            if (user_id === 'GUEST') {
            
                /////////////guest cart subtract
                console.log(`tmp_order_cart : ${tmp_order_cart}`);
                tmp_order_cart.forEach(element => {
                    console.log(element);

                    if (element.c_item_no === item_number) {
                        console.log(item_number)
                        element.c_item_quantity--;
                    }
                })

                localStorage.setItem("cart", JSON.stringify(tmp_order_cart));            
            
            } else {
                let data = {
                    u_id : tmp_order_cart.c_id,
                    item_num : item_number
                };

                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                        
                        },
                    body: JSON.stringify(data)
                };
                console.log(data);

                fetch(`/item_subtract`, options)
               
                .then((res) => res.json())
                .then(result => { console.log(result)})

            }

            console.log(`g_total : ${g_total}`)
            const new_grandtotal = g_total - item_price;
            g_total = new_grandtotal;
            document.querySelector('.online_place_order_item_grandtotal').innerText = '$' + new_grandtotal.toFixed(2);
        }
    }
    */

    if(e.target && (e.target.className) == 'online_place_order_item_delete_btn') { // item delete
        // console.log("online_place_order_item_delete_btn");
        let item_number = e.target.parentElement.getAttribute('contents-data-itemid');
        console.log(item_number);
        let item_quantity_id = document.querySelector(`[quantity-itemid="${item_number}"]`);
        let item_quantity = parseInt(item_quantity_id.innerText);
        const item_price = parseFloat(document.querySelector(`[price-itemid="${item_number}"]`).innerText.slice(1)); 
        // let item_number = (e.target.className).slice(-1);
        // let item_quantity = parseInt(document.querySelector(`.online_place_order_item_quantity.o${item_number}`).innerText);
        // const item_price = parseFloat(document.querySelector(`.online_place_order_item_price.o${item_number}`).innerText.slice(1)); 
        const delete_item_subtotal = parseFloat(item_quantity * item_price);
        const delete_item = document.querySelector(`[itemid="${item_number}"]`);
        console.log(delete_item);
        document.getElementById('online_place_order_item_container').removeChild(delete_item);

        if (user_id === 'GUEST') {            
            /////////////item delete in guest cart 
            console.log(`tmp_order_cart : ${tmp_order_cart}`);            

            let filtered = tmp_order_cart.filter((element) => element.c_item_no !== item_number);

            console.log(filtered);
            console.log(tmp_order_cart)
            tmp_order_cart = filtered;

            localStorage.setItem("cart", JSON.stringify(filtered));
        } else {
            ///// item delete in user cart 
            let data = {
                u_id : tmp_order_cart.c_id,
                item_num : item_number
            };

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    
                    },
                body: JSON.stringify(data)
            };
            console.log(data);

            fetch(`/item_delete`, options)
           
            .then((res) => res.json())
            .then(result => { console.log(result)})


        }


        const new_grandtotal = g_total - delete_item_subtotal;
        g_total = new_grandtotal;
        document.querySelector('.online_place_order_item_grandtotal').innerText = '$' + new_grandtotal.toFixed(2);
    }

    if(e.target && e.target.className == 'proceed_order_btn') {
        let check_out_cart = '';

        const orderConfirm = new order_confirm();
        console.log(user_id)
        
        let checked_test = '';
        let dctest = 'input[name="online_place_order_item_check_btn"]:checked';
        const selectedEls = document.querySelectorAll(dctest);
        
        selectedEls.forEach((el) => {
            console.log(el)
          });


        if(user_id === 'GUEST') {
            check_out_cart = localStorage.getItem('cart');
            console.log(check_out_cart)

            document.getElementById("online_main").innerHTML = orderConfirm.getGuestOrderConfirm();
            orderConfirm.makeGuestCheckOutForm(g_total); 
        } else {
            document.getElementById("online_main").innerHTML = orderConfirm.getUserOrderConfirm();
            orderConfirm.makeUserCheckOutForm(user_id, g_total);
        }
    }

});

// document.addEventListener('click',function(e){    
//     if(e.target && e.target.className == 'proceed_order_btn') {
//         console.log("order confirm action")
//         const orderConfirm = new order_confirm();
//         document.querySelector(".online_order").innerHTML = orderConfirm.getHtml();
        
        
//     } if(e.target && e.target.className == 'cancel_proceed_order_btn') {
//         window.history.back();
        
        
//     }
//     if(e.target && (e.target.className).slice(-1) == 'online_place_order_item_plus_quantity_btn.o') {
//         console.log("online_place_order_item_plus_quantity_btn");
//     }

// });
