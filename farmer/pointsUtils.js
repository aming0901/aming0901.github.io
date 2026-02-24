// pointsUtils.js - 积分机制通用工具函数
/**
 * 获取买家积分（按用户名）
 * @param {string} username 买家用户名
 * @returns {number} 买家当前积分
 */
function getBuyerPoints(username) {
    const buyerPoints = JSON.parse(localStorage.getItem('buyerPoints')) || {};
    return buyerPoints[username] || 0;
}

/**
 * 增加买家积分（消费金额 × 10，下单用）
 * @param {string} username 买家用户名
 * @param {number} amount 消费金额
 * @returns {number} 更新后的积分
 */
function addBuyerPoints(username, amount) {
    const buyerPoints = JSON.parse(localStorage.getItem('buyerPoints')) || {};
    const addPoints = Math.floor(amount * 10); // 1元=10积分（下单规则）
    buyerPoints[username] = (buyerPoints[username] || 0) + addPoints;
    localStorage.setItem('buyerPoints', JSON.stringify(buyerPoints));
    return buyerPoints[username];
}

/**
 * 获取商品积分（按商品ID）
 * @param {string} productId 商品ID
 * @returns {number} 商品当前积分
 */
function getProductPoints(productId) {
    const productPoints = JSON.parse(localStorage.getItem('productPoints')) || {};
    return productPoints[productId] || 0;
}

/**
 * 直接增加商品积分（推广购买用，1元=5积分）
 * @param {string} productId 商品ID
 * @param {number} points 要增加的积分值
 * @returns {number} 更新后的积分
 */
function addProductPointsDirect(productId, points) {
    const productPoints = JSON.parse(localStorage.getItem('productPoints')) || {};
    productPoints[productId] = (productPoints[productId] || 0) + Math.floor(points);
    localStorage.setItem('productPoints', JSON.stringify(productPoints));
    return productPoints[productId];
}

/**
 * 增加商品积分（下单用，金额×10）
 * @param {string} productId 商品ID
 * @param {number} amount 消费金额
 * @returns {number} 更新后的积分
 */
function addProductPoints(productId, amount) {
    const addPoints = Math.floor(amount * 10); // 1元=10积分（下单规则）
    return addProductPointsDirect(productId, addPoints);
}

/**
 * 渲染买家积分到页面（所有买家页面通用）
 * @param {string} username 买家用户名
 */
function renderBuyerPoints(username) {
    const pointsElement = document.getElementById('buyerPoints');
    if (pointsElement) {
        const points = getBuyerPoints(username);
        pointsElement.textContent = `积分：${points}`;
    }
}

/**
 * 记录订单积分明细
 * @param {string} orderId 订单ID
 * @param {string} productId 商品ID
 * @param {string} username 买家用户名
 * @param {number} points 本次获得积分
 */
function recordOrderPoints(orderId, productId, username, points) {
    const orderPoints = JSON.parse(localStorage.getItem('orderPoints')) || {};
    orderPoints[orderId] = {
        productId,
        username,
        points,
        createTime: new Date().toLocaleString()
    };
    localStorage.setItem('orderPoints', JSON.stringify(orderPoints));
}

/**
 * 获取订单积分明细
 * @param {string} orderId 订单ID
 * @returns {object} 积分明细
 */
function getOrderPoints(orderId) {
    const orderPoints = JSON.parse(localStorage.getItem('orderPoints')) || {};
    return orderPoints[orderId] || { points: 0 };
}