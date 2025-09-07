"use client"

import type React from "react"

import { useState } from "react"
import { Facebook, Twitter, Instagram } from "lucide-react"

export default function USAAdvertisingPlatform() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedState, setSelectedState] = useState<string | null>(null)
  const [selectedAd, setSelectedAd] = useState<any>(null) // Changed to store full ad object instead of just ID

  const steps = ["Select Your Location", "Choose Your Ad", "Checkout", "Order Summary"]

  const adOptions = [
    {
      id: "single-slot",
      title: "SINGLE SLOT LISTING",
      price: 300,
      remaining: "500 REMAINING",
      description: "Basic business listing with contact information",
    },
    {
      id: "quarter-page",
      title: "1/4 PAGE ADVERTORIAL",
      price: 1000,
      remaining: "7/10 REMAINING",
      description: "Quarter page advertisement with detailed content",
    },
    {
      id: "half-page",
      title: "1/2 PAGE ADVERTORIAL",
      price: 1800,
      remaining: "3/10 REMAINING",
      description: "Half page advertisement with premium placement",
    },
    {
      id: "full-page",
      title: "FULL PAGE AD",
      price: 2500,
      remaining: "2/10 REMAINING",
      description: "Full page premium advertisement",
    },
  ]

  const handleAdSelect = (adId: string) => {
    const ad = adOptions.find((ad) => ad.id === adId)
    setSelectedAd(ad)
  }

  const handleBuyAd = (ad: any) => {
    setSelectedAd(ad)
    setCurrentStep(2) // Go directly to checkout
  }

  const handleContinue = () => {
    if (selectedAd) {
      setCurrentStep(2)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-6 border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <img
            src="/logo.svg"
            alt="Green Pages"
            className="h-8 w-auto cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => {
              setCurrentStep(0)
              setSelectedState(null)
              setSelectedAd(null)
            }}
          />
        </div>
        <nav className="flex space-x-8">
          <a href="#" className="text-gray-300 hover:text-white">
            ABOUT
          </a>
          <a href="#" className="text-gray-300 hover:text-white">
            DIGITAL
          </a>
          <a href="#" className="text-gray-300 hover:text-white">
            PRINT
          </a>
          <a href="#" className="text-gray-300 hover:text-white">
            CONTACT
          </a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {currentStep === 0 && <LocationStep onStateSelect={setSelectedState} />}
        {currentStep === 1 && (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left side - State SVG */}
              <div className="bg-gray-900 rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-center">CHOOSE YOUR AD</h2>
                <div className="text-center mb-6">
                  <h3 className="text-xl text-green-400 mb-2">{selectedState} ADS AVAILABLE</h3>
                </div>

                {/* Display the selected state's SVG */}
                <div className="flex justify-center mb-6">
                  {selectedState && (
                    <img
                      src={`/states/${selectedState.toLowerCase()}.svg`}
                      alt={`${selectedState} state`}
                      className="w-48 h-48 object-contain"
                    />
                  )}
                </div>
              </div>

              {/* Right side - Ad Options */}
              <div className="bg-gray-900 rounded-lg p-8">
                <div className="space-y-4">
                  {adOptions.map((ad) => (
                    <div
                      key={ad.id}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        selectedAd?.id === ad.id
                          ? "border-green-500 bg-green-900/20"
                          : "border-gray-600 hover:border-green-400"
                      }`}
                      onClick={() => handleAdSelect(ad.id)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-white">{ad.title}</h3>
                          <p className="text-sm text-gray-400">{ad.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-400">${ad.price}</div>
                          <div className="text-sm text-gray-400">{ad.remaining}</div>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleBuyAd(ad)
                          }}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-semibold"
                        >
                          BUY →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <p className="text-sm text-gray-400 mb-4">
                    *INCLUDES GEOTARGETED DIGITAL IMPRESSIONS & SINGLE LISTING
                  </p>
                  <button
                    onClick={handleContinue}
                    disabled={!selectedAd}
                    className={`px-8 py-3 rounded-lg font-semibold ${
                      selectedAd
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "bg-gray-600 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    CONTINUE TO CHECKOUT
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {currentStep === 2 && (
          <CheckoutStep selectedAd={selectedAd} selectedState={selectedState} onNext={() => setCurrentStep(3)} />
        )}
        {currentStep === 3 && <OrderSummaryStep selectedAd={selectedAd} selectedState={selectedState} />}
      </main>

      {/* Footer */}
      <footer className="p-6 border-t border-gray-800">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-400">PRESENTED BY CANNABIS NOW & LAUNCH MEDIA</div>
          <div className="flex space-x-4">
            <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
            <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
            <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
          </div>
        </div>
      </footer>
    </div>
  )
}

function LocationStep({ onStateSelect }: { onStateSelect: (state: string) => void }) {
  const [selectedState, setSelectedState] = useState<string | null>(null)

  const handleStateClick = (stateCode: string) => {
    const activeStates = ["CA", "IL", "MO", "OK", "MT", "NY"]

    if (activeStates.includes(stateCode)) {
      setSelectedState(stateCode)
      onStateSelect(stateCode)

      const stateRoutes: { [key: string]: string } = {
        CA: "/california",
        IL: "/illinois",
        MO: "/missouri",
        OK: "/oklahoma",
        MT: "/montana",
        NY: "/new-york",
      }

      const route = stateRoutes[stateCode]
      if (route) {
        setTimeout(() => {
          window.location.href = route
        }, 500)
      }
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">Select Your Location</h1>
      <div className="relative bg-gray-900 rounded-lg p-8 mb-8">
        <div className="w-full h-96 rounded-lg overflow-hidden flex items-center justify-center">
          <div className="w-full h-full max-w-2xl">
            <svg
              viewBox="0 0 1000 600"
              className="w-full h-full cursor-pointer"
              style={{
                filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))",
              }}
            >
              <style>
                {`
                  .state-inactive {
                    fill: #374151;
                    stroke: #1f2937;
                    stroke-width: 1;
                    cursor: default;
                  }
                  .state-active {
                    fill: #16a34a;
                    stroke: #15803d;
                    stroke-width: 2;
                    cursor: pointer;
                    transition: all 0.3s ease;
                  }
                  .state-active:hover {
                    fill: #22c55e;
                    stroke: #16a34a;
                    stroke-width: 3;
                    filter: brightness(1.2);
                  }
                  .state-selected {
                    fill: #22c55e;
                    stroke: #16a34a;
                    stroke-width: 3;
                    animation: pulse 2s infinite;
                  }
                  @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.7; }
                  }
                `}
              </style>

              {/* California */}
              <path
                d="M50 200 L50 450 L150 450 L150 350 L120 320 L120 280 L100 250 L80 220 Z"
                className={`${selectedState === "CA" ? "state-selected" : "state-active"}`}
                onClick={() => handleStateClick("CA")}
              />

              {/* Montana */}
              <path
                d="M200 100 L450 100 L450 180 L200 180 Z"
                className={`${selectedState === "MT" ? "state-selected" : "state-active"}`}
                onClick={() => handleStateClick("MT")}
              />

              {/* Oklahoma */}
              <path
                d="M350 300 L550 300 L550 350 L350 350 Z"
                className={`${selectedState === "OK" ? "state-selected" : "state-active"}`}
                onClick={() => handleStateClick("OK")}
              />

              {/* Missouri */}
              <path
                d="M450 250 L550 250 L550 320 L500 320 L480 300 L450 300 Z"
                className={`${selectedState === "MO" ? "state-selected" : "state-active"}`}
                onClick={() => handleStateClick("MO")}
              />

              {/* Illinois */}
              <path
                d="M550 200 L580 200 L580 320 L550 320 Z"
                className={`${selectedState === "IL" ? "state-selected" : "state-active"}`}
                onClick={() => handleStateClick("IL")}
              />

              {/* New York */}
              <path
                d="M700 150 L800 150 L800 220 L750 220 L720 200 L700 180 Z"
                className={`${selectedState === "NY" ? "state-selected" : "state-active"}`}
                onClick={() => handleStateClick("NY")}
              />

              {/* Inactive states - simplified shapes */}
              <path d="M150 180 L200 180 L200 250 L150 250 Z" className="state-inactive" />
              <path d="M450 180 L550 180 L550 250 L450 250 Z" className="state-inactive" />
              <path d="M580 200 L650 200 L650 280 L580 280 Z" className="state-inactive" />
              <path d="M200 250 L350 250 L350 350 L200 350 Z" className="state-inactive" />
              <path d="M150 350 L350 350 L350 450 L150 450 Z" className="state-inactive" />
              <path d="M350 350 L550 350 L550 450 L350 450 Z" className="state-inactive" />
              <path d="M550 320 L650 320 L650 450 L550 450 Z" className="state-inactive" />
              <path d="M650 200 L750 200 L750 320 L650 320 Z" className="state-inactive" />
              <path d="M750 150 L850 150 L850 280 L750 280 Z" className="state-inactive" />
              <path d="M800 220 L900 220 L900 350 L800 350 Z" className="state-inactive" />

              {/* State labels */}
              <text x="100" y="325" fill="white" fontSize="12" textAnchor="middle" pointerEvents="none">
                CA
              </text>
              <text x="325" y="140" fill="white" fontSize="12" textAnchor="middle" pointerEvents="none">
                MT
              </text>
              <text x="450" y="325" fill="white" fontSize="12" textAnchor="middle" pointerEvents="none">
                OK
              </text>
              <text x="500" y="285" fill="white" fontSize="12" textAnchor="middle" pointerEvents="none">
                MO
              </text>
              <text x="565" y="260" fill="white" fontSize="12" textAnchor="middle" pointerEvents="none">
                IL
              </text>
              <text x="750" y="185" fill="white" fontSize="12" textAnchor="middle" pointerEvents="none">
                NY
              </text>
            </svg>
          </div>
        </div>
        {selectedState && (
          <div className="text-center mt-4">
            <p className="text-green-400">Selected: {selectedState}</p>
          </div>
        )}
      </div>
    </div>
  )
}

function CheckoutStep({
  selectedAd,
  selectedState,
  onNext,
}: { selectedAd: any; selectedState: string | null; onNext: () => void }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left side - Order Summary */}
        <div className="bg-gray-900 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6">ORDER SUMMARY</h2>

          {selectedAd && (
            <div className="border border-gray-700 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-bold text-white">{selectedAd.title}</h3>
                  <p className="text-sm text-gray-400">
                    {selectedState} - {selectedAd.description}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-green-400">${selectedAd.price}</div>
                </div>
              </div>
            </div>
          )}

          <div className="border-t border-gray-700 pt-4">
            <div className="flex justify-between items-center mb-2">
              <span>Subtotal:</span>
              <span>${selectedAd?.price || 0}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span>Tax:</span>
              <span>${selectedAd ? (selectedAd.price * 0.08).toFixed(2) : "0.00"}</span>
            </div>
            <div className="flex justify-between items-center text-xl font-bold text-green-400 border-t border-gray-700 pt-2">
              <span>Total:</span>
              <span>${selectedAd ? (selectedAd.price * 1.08).toFixed(2) : "0.00"}</span>
            </div>
          </div>
        </div>

        {/* Right side - Payment Form */}
        <div className="bg-gray-900 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6">BILLING INFORMATION</h2>

          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white placeholder-gray-400"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white placeholder-gray-400"
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white placeholder-gray-400"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white placeholder-gray-400"
            />

            <input
              type="text"
              name="company"
              placeholder="Company Name"
              value={formData.company}
              onChange={handleInputChange}
              className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white placeholder-gray-400"
            />

            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white placeholder-gray-400"
            />

            <div className="grid grid-cols-3 gap-4">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
                className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white placeholder-gray-400"
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleInputChange}
                className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white placeholder-gray-400"
              />
              <input
                type="text"
                name="zip"
                placeholder="ZIP"
                value={formData.zip}
                onChange={handleInputChange}
                className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white placeholder-gray-400"
              />
            </div>

            <h3 className="text-xl font-bold mt-6 mb-4">PAYMENT INFORMATION</h3>

            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              value={formData.cardNumber}
              onChange={handleInputChange}
              className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white placeholder-gray-400"
            />

            <div className="grid grid-cols-3 gap-4">
              <input
                type="text"
                name="expiryDate"
                placeholder="MM/YY"
                value={formData.expiryDate}
                onChange={handleInputChange}
                className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white placeholder-gray-400"
              />
              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                value={formData.cvv}
                onChange={handleInputChange}
                className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white placeholder-gray-400"
              />
              <input
                type="text"
                name="nameOnCard"
                placeholder="Name on Card"
                value={formData.nameOnCard}
                onChange={handleInputChange}
                className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white placeholder-gray-400"
              />
            </div>
          </form>

          <button
            onClick={onNext}
            className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold"
          >
            COMPLETE ORDER
          </button>
        </div>
      </div>
    </div>
  )
}

function OrderSummaryStep({ selectedAd, selectedState }: { selectedAd: any; selectedState: string | null }) {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-8">Order Confirmation</h1>

      <div className="bg-gray-900 rounded-lg p-8 mb-8">
        <div className="text-green-400 text-6xl mb-4">✓</div>
        <h2 className="text-2xl font-bold mb-4">Thank you for your order!</h2>

        {selectedAd && (
          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-bold mb-2">Order Details</h3>
            <p className="text-gray-300">{selectedAd.title}</p>
            <p className="text-gray-400">
              {selectedState} - {selectedAd.description}
            </p>
            <p className="text-green-400 text-xl font-bold mt-2">${(selectedAd.price * 1.08).toFixed(2)}</p>
          </div>
        )}

        <p className="text-gray-400 mb-4">
          You will receive a confirmation email shortly with your order details and next steps.
        </p>

        <button
          onClick={() => (window.location.href = "/")}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold"
        >
          PLACE ANOTHER ORDER
        </button>
      </div>
    </div>
  )
}
