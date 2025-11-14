export const COUPONS = {
  XINCHAO10: {
    type: 'percent',
    value: 0.1,
    max: 50000,
    description: 'Giảm 10% tối đa 50.000đ'
  },
  FREESHIP: {
    type: 'freeship',
    minSubtotal: 300000,
    description: 'Miễn phí ship cho đơn từ 300.000đ'
  }
}

export function validateCoupon(code = '', subtotal = 0) {
  const key = code.toUpperCase()
  const coupon = COUPONS[key]
  if (!coupon) {
    return { valid: false, message: 'Mã không hợp lệ' }
  }
  if (coupon.type === 'percent') {
    const discount = Math.min(subtotal * coupon.value, coupon.max)
    return {
      valid: true,
      code: key,
      discount,
      message: `Đã áp dụng giảm ${coupon.value * 100}% (tối đa 50.000đ)`
    }
  }
  if (coupon.type === 'freeship') {
    if (subtotal < coupon.minSubtotal) {
      return { valid: false, message: `Cần tối thiểu ${coupon.minSubtotal.toLocaleString('vi-VN')}đ để dùng mã` }
    }
    return {
      valid: true,
      code: key,
      freeship: true,
      message: 'Miễn phí vận chuyển cho đơn này'
    }
  }
  return { valid: false, message: 'Không thể áp dụng mã' }
}
