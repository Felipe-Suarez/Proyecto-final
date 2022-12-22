// EDIT PRODUCTS
const productBtn = document.querySelectorAll('.product-btn')
const productContainer = document.querySelector('.product-container')
const productBox = document.querySelectorAll('.product-box-position')

const deleteProduct = (e) => {
    productBtn.forEach(btn => {
        if (e.target === btn) {

            const productId = e.target.parentElement.attributes.name.nodeValue

            fetch(`/api/products/${productId}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(
                alert('Producto eliminado de la tienda')
            ).then(
                window.location.href = "/admin"
            )

        }
    })
}

const editInput = (e, editBtn, productInput, saveBox) => {
    if (e.target === editBtn || e.target === productInput) {
        productInput.focus();
        editBtn.style = 'display: none';
        saveBox.style = 'display: inline-block';
    }
}

const indentifyInput = (productInput) => {
    const name = productInput.getAttribute('name')
    return name
}

const saveConfirm = (e, editConfirm, editBtn, saveBox, box, productInput) => {
    if (e.target === editConfirm) {
        editBtn.style = 'display: inline-block';
        saveBox.style = 'display: none';

        let productId = box.parentElement.parentElement.attributes.name.nodeValue

        if (indentifyInput(productInput) === 'price') {
            fetch(`/api/products/${productId}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    price: parseInt(productInput.value)
                })
            }).then(res => res.json()).then(data => {
                if (data?.error) {
                    alert(data.error)
                    window.location.href = '/admin'
                } else {
                    alert(data)
                }
            })
        } else if (indentifyInput(productInput) === 'title') {
            fetch(`/api/products/${productId}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: productInput.value
                })
            }).then(res => res.json()).then(data => {
                if (data?.error) {
                    alert(data.error)
                    window.location.href = '/admin'
                } else {
                    alert(data)
                }
            })
        } else {
            fetch(`/api/products/${productId}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    category: productInput.value
                })
            }).then(res => res.json()).then(data => {
                if (data?.error) {
                    alert(data.error)
                    window.location.href = '/admin'
                } else {
                    alert(data)
                }
            })
        }

    }
}

const saveCancel = (e, editCancel, editBtn, saveBox, box, productInput) => {
    if (e.target === editCancel) {
        editBtn.style = 'display: inline-block';
        saveBox.style = 'display: none';

        let productId = box.parentElement.parentElement.attributes.name.nodeValue

        if (indentifyInput(productInput) === 'title') {
            fetch(`/api/products/${productId}`).then(res => res.json())
                .then(data => productInput.value = data.title)
        } else if (indentifyInput(productInput) === 'price') {
            fetch(`/api/products/${productId}`).then(res => res.json())
                .then(data => productInput.value = data.price)
        } else {
            fetch(`/api/products/${productId}`).then(res => res.json())
                .then(data => productInput.value = data.category)
        }
    }
}

const editProduct = (e) => {
    productBox.forEach(box => {
        const productInput = box.children[0]
        const editBtn = box.children[1]

        const saveBox = box.children[2]
        const editConfirm = saveBox.children[0]
        const editCancel = saveBox.children[1]

        editInput(e, editBtn, productInput, saveBox)
        saveConfirm(e, editConfirm, editBtn, saveBox, box, productInput)
        saveCancel(e, editCancel, editBtn, saveBox, box, productInput)
    })
}

productContainer.addEventListener('click', (e) => {
    deleteProduct(e)
    editProduct(e)
})

// CHAT
const vaciarChat = document.getElementById('vaciarChat')

let chatHTML = `<div class='chat-info-msg'>
                      <span>El chat se encuentra vacio en este momento<span/>
                  <div/>`;

vaciarChat.addEventListener('click', async () => {
    fetch('/api/chat', { method: 'delete' })
        .then(alert('Chat vaciado correctamente'))
        .then(document.getElementById("messages").innerHTML = chatHTML)
})