import axios from 'axios';
import { BASE_URL } from '@/constants';
import { getToken } from '@/services/authService';

function getAuthHeaders() {
    const token = getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function createMomoPayment(courseId) {
    const res = await axios.post(
        `${BASE_URL}/client/payments/momo/create`,
        { course_id: courseId },
        { headers: getAuthHeaders() },
    );

    return res.data;
}

export async function getOrderStatus(orderNumber) {
    const res = await axios.get(`${BASE_URL}/client/orders/${orderNumber}/status`, {
        headers: getAuthHeaders(),
    });

    return res.data;
}

export async function mockPaymentSuccess(orderNumber) {
    const res = await axios.post(
        `${BASE_URL}/client/payments/mock-success`,
        { order_number: orderNumber },
        { headers: getAuthHeaders() },
    );

    return res.data;
}
