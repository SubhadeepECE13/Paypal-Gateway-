require('dotenv').config()
const express = require('express')
const paypal = require('./services/paypal')

const app = express()

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/pay', async(req, res) => {
    try {
        const url = await paypal.createOrder()

        res.redirect(url)
    } catch (error) {
        res.send('Error: ' + error)
    }
})

app.get('/complete-order', async (req, res) => {
    try {
        // Assuming paypal.capturePayment(req.query.token) is an asynchronous function that captures payment
        await paypal.capturePayment(req.query.token);

        // Redirect to the success page after successful payment capture
        res.send("Congratulation Successfull Payment");
    } catch (error) {
        // Handle errors if payment capture fails
        res.send('Error: ' + error);
    }
});

app.get('/cancel-order', (req, res) => {
    res.redirect('/')
})

app.listen(process.env.PORT, () => console.log('Server started'))