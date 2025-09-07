"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ArrowRight, Facebook, Twitter, Instagram, Upload } from "lucide-react"
import { fetchInventory, createOrder, updateOrderWithUploadData } from "@/lib/actions"

interface AdData {
  id: string
  title: string
  price: number
  remaining: string
  description: string
  quantity_available: number
}

interface CustomerData {
  firstName: string
  lastName: string
  email: string
  shippingAddress: string
  shippingCity: string
  shippingState: string
  shippingZip: string
  billingAddress: string
  billingCity: string
  billingState: string
  billingZip: string
}

export default function MontanaPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedAd, setSelectedAd] = useState<AdData | null>(null)
  const [customerData, setCustomerData] = useState<CustomerData>({
    firstName: "",
    lastName: "",
    email: "",
    shippingAddress: "",
    shippingCity: "",
    shippingState: "",
    shippingZip: "",
    billingAddress: "",
    billingCity: "",
    billingState: "",
    billingZip: "",
  })
  const [orderId, setOrderId] = useState<string | null>(null)
  const steps = ["Choose Your Ad", "Checkout", "Order Summary", "Upload Requirements"]

  const handleAdSelect = (ad: AdData) => {
    setSelectedAd(ad)
    setCurrentStep(1)
  }

  const handleCheckoutSubmit = async () => {
    if (!selectedAd) return

    const result = await createOrder({
      orderNumber: `MT-${Date.now()}`,
      customerName: `${customerData.firstName} ${customerData.lastName}`,
      customerEmail: customerData.email,
      billingAddress: {
        address: customerData.billingAddress,
        city: customerData.billingCity,
        state: customerData.billingState,
        zip: customerData.billingZip,
      },
      shippingAddress: {
        address: customerData.shippingAddress,
        city: customerData.shippingCity,
        state: customerData.shippingState,
        zip: customerData.shippingZip,
      },
      stateCode: "MT",
      stateName: "Montana",
      adType: selectedAd.description,
      adPrice: selectedAd.price * 100,
      totalAmount: selectedAd.price * 100,
    })

    if (result.success && result.data) {
      setOrderId(result.data.id)
      setCurrentStep(3)
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
            onClick={() => (window.location.href = "/")}
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
        {currentStep === 0 && <AdSelectionStep onAdSelect={handleAdSelect} state="Montana" stateCode="MT" />}
        {currentStep === 1 && (
          <CheckoutStep
            onNext={() => setCurrentStep(2)}
            state="Montana"
            selectedAd={selectedAd}
            customerData={customerData}
            setCustomerData={setCustomerData}
          />
        )}
        {currentStep === 2 && (
          <OrderSummaryStep
            state="Montana"
            selectedAd={selectedAd}
            customerData={customerData}
            onSubmit={handleCheckoutSubmit}
          />
        )}
        {currentStep === 3 && <UploadRequirementsStep state="Montana" selectedAd={selectedAd} orderId={orderId} />}
      </main>

      {/* Footer */}
      <footer className="p-6 border-t border-gray-800">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-400">PRESENTED BY CANNABIS NOW & LIONTEK MEDIA</div>
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

function AdSelectionStep({
  onAdSelect,
  state,
  stateCode,
}: { onAdSelect: (ad: AdData) => void; state: string; stateCode: string }) {
  const [adOptions, setAdOptions] = useState<AdData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadInventory = async () => {
      const result = await fetchInventory(state)

      if (result.success && result.data) {
        setAdOptions(result.data)
      }
      setLoading(false)
    }

    loadInventory()
  }, [state])

  const getStateSvg = (code: string) => {
    const stateMap: { [key: string]: string } = {
      MT: "/states/mt.svg",
      CA: "/states/ca.svg",
      OK: "/states/ok.svg",
      NY: "/states/nyc.svg",
      IL: "/states/il.svg",
      MO: "/states/mo.svg",
    }
    return stateMap[code] || null
  }

  if (loading) {
    return <div className="text-center">Loading inventory...</div>
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md">
            <img src={getStateSvg(stateCode) || "/placeholder.svg"} alt={`${state} state`} className="w-full h-auto" />
          </div>
        </div>

        <div>
          <h1 className="text-4xl font-bold mb-2">CHOOSE YOUR AD</h1>
          <h2 className="text-2xl text-green-500 mb-8">{state.toUpperCase()} ADS AVAILABLE</h2>

          <div className="space-y-6">
            {adOptions.map((ad) => (
              <AdOption key={ad.id} ad={ad} onSelect={() => onAdSelect(ad)} />
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-gray-400 mb-4">*INCLUDES GEOTARGETED DIGITAL IMPRESSIONS & SINGLE LISTING</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function AdOption({ ad, onSelect }: { ad: AdData; onSelect: () => void }) {
  return (
    <Card className="bg-gray-900 border-gray-700 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-white mb-2">{ad.title}</h3>
          <p className="text-green-500">{ad.remaining}</p>
        </div>
        <Button
          onClick={onSelect}
          className="bg-green-600 hover:bg-green-700 text-white"
          disabled={ad.quantity_available === 0}
        >
          {ad.quantity_available === 0 ? "SOLD OUT" : `BUY $${ad.price}`} <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </Card>
  )
}

function CheckoutStep({
  onNext,
  state,
  selectedAd,
  customerData,
  setCustomerData,
}: {
  onNext: () => void
  state: string
  selectedAd: AdData | null
  customerData: CustomerData
  setCustomerData: (data: CustomerData) => void
}) {
  const handleInputChange = (field: keyof CustomerData, value: string) => {
    setCustomerData({ ...customerData, [field]: value })
  }

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <h1 className="text-4xl font-bold mb-8">CHECKOUT - {state.toUpperCase()}</h1>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-4 text-green-500">GUEST INFO</h3>
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="First Name"
                className="bg-gray-900 border-gray-700 text-white"
                value={customerData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
              />
              <Input
                placeholder="Last Name"
                className="bg-gray-900 border-gray-700 text-white"
                value={customerData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
              />
            </div>
            <Input
              placeholder="Email"
              className="bg-gray-900 border-gray-700 text-white mt-4"
              value={customerData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-green-500">SHIPPING ADDRESS</h3>
            <div className="space-y-4">
              <Input
                placeholder="Address"
                className="bg-gray-900 border-gray-700 text-white"
                value={customerData.shippingAddress}
                onChange={(e) => handleInputChange("shippingAddress", e.target.value)}
              />
              <div className="grid grid-cols-3 gap-4">
                <Input
                  placeholder="City"
                  className="bg-gray-900 border-gray-700 text-white"
                  value={customerData.shippingCity}
                  onChange={(e) => handleInputChange("shippingCity", e.target.value)}
                />
                <Input
                  placeholder="State"
                  className="bg-gray-900 border-gray-700 text-white"
                  value={customerData.shippingState}
                  onChange={(e) => handleInputChange("shippingState", e.target.value)}
                />
                <Input
                  placeholder="Zip"
                  className="bg-gray-900 border-gray-700 text-white"
                  value={customerData.shippingZip}
                  onChange={(e) => handleInputChange("shippingZip", e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-green-500">BILLING ADDRESS</h3>
            <div className="space-y-4">
              <Input
                placeholder="Address"
                className="bg-gray-900 border-gray-700 text-white"
                value={customerData.billingAddress}
                onChange={(e) => handleInputChange("billingAddress", e.target.value)}
              />
              <div className="grid grid-cols-3 gap-4">
                <Input
                  placeholder="City"
                  className="bg-gray-900 border-gray-700 text-white"
                  value={customerData.billingCity}
                  onChange={(e) => handleInputChange("billingCity", e.target.value)}
                />
                <Input
                  placeholder="State"
                  className="bg-gray-900 border-gray-700 text-white"
                  value={customerData.billingState}
                  onChange={(e) => handleInputChange("billingState", e.target.value)}
                />
                <Input
                  placeholder="Zip"
                  className="bg-gray-900 border-gray-700 text-white"
                  value={customerData.billingZip}
                  onChange={(e) => handleInputChange("billingZip", e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-green-500">PAYMENT INFO</h3>
            <div className="space-y-4">
              <Input placeholder="Card Number" className="bg-gray-900 border-gray-700 text-white" />
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="MM/YY" className="bg-gray-900 border-gray-700 text-white" />
                <Input placeholder="CVC" className="bg-gray-900 border-gray-700 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h1 className="text-4xl font-bold mb-8">ORDER SUMMARY</h1>
        <Card className="bg-gray-900 border-gray-700 p-6 mb-6">
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>
                {selectedAd?.description || "No ad selected"} - {state}
              </span>
              <span>USD {selectedAd?.price || 0}.00</span>
            </div>
            <div className="flex justify-between">
              <span>Digital Impressions</span>
              <span>USD 0.00</span>
            </div>
            <hr className="border-gray-700" />
            <div className="flex justify-between text-xl font-bold">
              <span>TOTAL</span>
              <span>USD {selectedAd?.price || 0}.00</span>
            </div>
          </div>
        </Card>

        <Button onClick={onNext} className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-xl">
          CONTINUE TO ORDER SUMMARY
        </Button>
      </div>
    </div>
  )
}

function OrderSummaryStep({
  state,
  selectedAd,
  customerData,
  onSubmit,
}: {
  state: string
  selectedAd: AdData | null
  customerData: CustomerData
  onSubmit: () => void
}) {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-8">ORDER SUMMARY - {state.toUpperCase()}</h1>

      <Card className="bg-gray-900 border-gray-700 p-8 mb-8">
        <div className="space-y-4">
          <div className="flex justify-between text-lg">
            <span>
              {selectedAd?.description || "No ad selected"} - {state}
            </span>
            <span>USD {selectedAd?.price || 0}.00</span>
          </div>
          <div className="flex justify-between">
            <span>Digital Impressions</span>
            <span>USD 0.00</span>
          </div>
          <hr className="border-gray-700" />
          <div className="flex justify-between text-2xl font-bold">
            <span>TOTAL</span>
            <span>USD {selectedAd?.price || 0}.00</span>
          </div>
        </div>
      </Card>

      <div className="text-left mb-8">
        <h3 className="text-xl font-bold mb-4 text-green-500">CUSTOMER INFORMATION</h3>
        <div className="bg-gray-900 p-6 rounded-lg">
          <p>
            <strong>Name:</strong> {customerData.firstName} {customerData.lastName}
          </p>
          <p>
            <strong>Email:</strong> {customerData.email}
          </p>
          <p>
            <strong>Shipping:</strong> {customerData.shippingAddress}, {customerData.shippingCity},{" "}
            {customerData.shippingState} {customerData.shippingZip}
          </p>
        </div>
      </div>

      <Button onClick={onSubmit} className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-xl">
        CONFIRM ORDER & PROCEED TO UPLOAD
      </Button>
    </div>
  )
}

function UploadRequirementsStep({
  state,
  selectedAd,
  orderId,
}: {
  state: string
  selectedAd: AdData | null
  orderId: string | null
}) {
  const [uploadData, setUploadData] = useState({
    dispensaryName: "",
    dispensaryAddress: "",
    webAddress: "",
    phoneNumber: "",
    instagram: "",
  })

  const handleSubmit = async () => {
    if (!orderId) return

    const result = await updateOrderWithUploadData(orderId, {
      companyName: uploadData.dispensaryName,
      uploadRequirements: {
        dispensary_address: uploadData.dispensaryAddress,
        web_address: uploadData.webAddress,
        phone_number: uploadData.phoneNumber,
        instagram: uploadData.instagram,
      },
    })

    if (result.success) {
      alert("Order submitted successfully!")
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">UPLOAD REQUIREMENTS</h1>

      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-center">{selectedAd?.description?.toUpperCase() || "AD TYPE"}</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-green-500">Dispensary/Brand Name</label>
              <Input
                className="bg-green-600 border-green-500 text-white placeholder-green-200"
                value={uploadData.dispensaryName}
                onChange={(e) => setUploadData({ ...uploadData, dispensaryName: e.target.value })}
              />
            </div>

            {selectedAd?.description?.includes("Page") && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2">Document Upload: .TXT .DOCX .PDF</label>
                  <div className="flex items-center space-x-4">
                    <Input className="bg-green-600 border-green-500 text-white flex-1" />
                    <Button className="bg-green-700 hover:bg-green-800">
                      <Upload className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">Document Requirements: 50 - 60 Words</p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Photo Upload: .JPEG .PNG .TIFF</label>
                  <div className="flex items-center space-x-4">
                    <Input className="bg-green-600 border-green-500 text-white flex-1" />
                    <Button className="bg-green-700 hover:bg-green-800">
                      <Upload className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">Photo Requirements: Landscape - min 1600px x 900px</p>
                </div>
              </>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4 text-white">SINGLE LISTING</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-green-500">Dispensary Address</label>
              <Input
                className="bg-green-600 border-green-500 text-white placeholder-green-200"
                value={uploadData.dispensaryAddress}
                onChange={(e) => setUploadData({ ...uploadData, dispensaryAddress: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-green-500">Web Address</label>
              <Input
                className="bg-green-600 border-green-500 text-white placeholder-green-200"
                value={uploadData.webAddress}
                onChange={(e) => setUploadData({ ...uploadData, webAddress: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-green-500">Phone Number</label>
                <Input
                  className="bg-green-600 border-green-500 text-white placeholder-green-200"
                  value={uploadData.phoneNumber}
                  onChange={(e) => setUploadData({ ...uploadData, phoneNumber: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-green-500">Instagram</label>
                <Input
                  className="bg-green-600 border-green-500 text-white placeholder-green-200"
                  value={uploadData.instagram}
                  onChange={(e) => setUploadData({ ...uploadData, instagram: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4 text-white">DIGITAL LISTING</h3>
          <div>
            <label className="block text-sm font-medium mb-2">Logo Upload: .EPS .AI</label>
            <div className="flex items-center space-x-4">
              <Input className="bg-green-600 border-green-500 text-white flex-1" />
              <Button className="bg-green-700 hover:bg-green-800">
                <Upload className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-sm text-gray-400 mt-2">Logo Requirements: Vector File ONLY</p>
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-2xl font-bold rounded-full"
        >
          SUBMIT
        </Button>
      </div>
    </div>
  )
}
