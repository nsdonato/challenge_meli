import React from 'react'
import '@testing-library/jest-dom/extend-expect'

jest.mock('./client/assets/images/logo.png', () => <mock-img-logo />)
jest.mock('./client/assets/images/shipping.png', () => <mock-img-shipping />)
