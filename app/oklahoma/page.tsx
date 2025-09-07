"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ArrowRight, Facebook, Twitter, Instagram } from "lucide-react"

interface AdData {
  id: string
  title: string
  price: number
  remaining: string
  description: string
}

export default function OklahomaPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedAd, setSelectedAd] = useState<AdData | null>(null)
  const steps = ["Choose Your Ad", "Checkout", "Order Summary"]

  const handleAdSelect = (ad: AdData) => {
    setSelectedAd(ad)
    setCurrentStep(1)
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
        {currentStep === 0 && <AdSelectionStep onAdSelect={handleAdSelect} state="Oklahoma" stateCode="OK" />}
        {currentStep === 1 && (
          <CheckoutStep onNext={() => setCurrentStep(2)} state="Oklahoma" selectedAd={selectedAd} />
        )}
        {currentStep === 2 && <OrderSummaryStep state="Oklahoma" selectedAd={selectedAd} />}
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

function AdSelectionStep({
  onAdSelect,
  state,
  stateCode,
}: { onAdSelect: (ad: AdData) => void; state: string; stateCode: string }) {
  const adOptions: AdData[] = [
    {
      id: "single",
      title: "SINGLE SLOT LISTING - 300",
      price: 500,
      remaining: "60/100 REMAINING",
      description: "Single Slot Listing",
    },
    {
      id: "quarter",
      title: "1/4 PAGE ADVERTORIAL - 1000",
      price: 1000,
      remaining: "7/10 REMAINING",
      description: "1/4 Page Advertorial",
    },
    {
      id: "half",
      title: "1/2 PAGE ADVERTORIAL - 1800",
      price: 1800,
      remaining: "3/5 REMAINING",
      description: "1/2 Page Advertorial",
    },
    { id: "full", title: "FULL PAGE AD - 2500", price: 2500, remaining: "2/10 REMAINING", description: "Full Page Ad" },
  ]

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
        <Button onClick={onSelect} className="bg-green-600 hover:bg-green-700 text-white">
          BUY ${ad.price} <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </Card>
  )
}

function CheckoutStep({ onNext, state, selectedAd }: { onNext: () => void; state: string; selectedAd: AdData | null }) {
  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <h1 className="text-4xl font-bold mb-8">CHECKOUT - {state.toUpperCase()}</h1>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-4 text-green-500">GUEST INFO</h3>
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="First Name" className="bg-gray-900 border-gray-700 text-white" />
              <Input placeholder="Last Name" className="bg-gray-900 border-gray-700 text-white" />
            </div>
            <Input placeholder="Email" className="bg-gray-900 border-gray-700 text-white mt-4" />
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-green-500">SHIPPING ADDRESS</h3>
            <div className="space-y-4">
              <Input placeholder="Address" className="bg-gray-900 border-gray-700 text-white" />
              <div className="grid grid-cols-3 gap-4">
                <Input placeholder="City" className="bg-gray-900 border-gray-700 text-white" />
                <Input placeholder="State" className="bg-gray-900 border-gray-700 text-white" />
                <Input placeholder="Zip" className="bg-gray-900 border-gray-700 text-white" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-green-500">BILLING ADDRESS</h3>
            <div className="space-y-4">
              <Input placeholder="Address" className="bg-gray-900 border-gray-700 text-white" />
              <div className="grid grid-cols-3 gap-4">
                <Input placeholder="City" className="bg-gray-900 border-gray-700 text-white" />
                <Input placeholder="State" className="bg-gray-900 border-gray-700 text-white" />
                <Input placeholder="Zip" className="bg-gray-900 border-gray-700 text-white" />
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
            SUBMIT
          </Button>
        </div>
      </div>
    </div>
  )
}

function OrderSummaryStep({ state, selectedAd }: { state: string; selectedAd: AdData | null }) {
  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <h1 className="text-4xl font-bold mb-8">ORDER SUMMARY - {state.toUpperCase()}</h1>
        <Card className="bg-gray-900 border-gray-700 p-6">
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
      </div>

      <div>
        <h1 className="text-4xl font-bold mb-8">UPLOAD REQUIREMENTS</h1>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-4 text-green-500">1/4 PAGE ADVERTORIAL</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Company Name</label>
                <Input className="bg-gray-900 border-gray-700 text-white" />
              </div>
              <div>
                <label className="block text-sm mb-2">Company Address</label>
                <Input className="bg-gray-900 border-gray-700 text-white" />
              </div>
              <div>
                <label className="block text-sm mb-2">Phone Number</label>
                <Input className="bg-gray-900 border-gray-700 text-white" />
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">CHOOSE</Button>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-green-500">SINGLE LISTING</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Company Name</label>
                <Input className="bg-gray-900 border-gray-700 text-white" />
              </div>
              <div>
                <label className="block text-sm mb-2">Company Address</label>
                <Input className="bg-gray-900 border-gray-700 text-white" />
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">CHOOSE</Button>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-green-500">DIGITAL LISTING</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Company Name - 25% off</label>
                <Input className="bg-gray-900 border-gray-700 text-white" />
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">CHOOSE</Button>
            </div>
          </div>

          <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-xl">SUBMIT</Button>
        </div>
      </div>
    </div>
  )
}
