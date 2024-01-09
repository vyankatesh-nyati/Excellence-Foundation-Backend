FROM node:18-alpine

ENV ADMIN_SECRET=Thisismysecretkeepyourmouthoffimnotshowingthissecrettoyouitisasecreteofadmin \
    USER_SECRET=Thisismysecretkeepyourmouthoffimnotshowingthissecrettoyou \
    MONGO_DATABASE=excellence-foundation \
    MONGO_USER=admin-vyankatesh \
    MONGO_PASS=Vyankatesh1405 \
    RAZORPAY_SECRET=MmHdGFnpbKFzgwuaUGlTc2M7 \
    RAZORPAY_KEY_ID=rzp_test_jRv92tDiAcSF66

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["node", "app.js"]