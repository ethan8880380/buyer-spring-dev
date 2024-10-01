'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface FormData {
  name: string
  email: string
  phoneNumber: string
  zipCodes: string[]
  budget: number
  homeType: string
  minBedrooms: string
  minBathrooms: string
  minSqft: string
  proxToMainSt: string
  minGarageSpaces: string
  views: string
  additionalDwellingUnit: boolean
  houseCondition: string
  homeColor: string
  garden: boolean
  porch: boolean
  yardSize: string
  hotTubAndPool: boolean
  haveRepresentation: boolean
  preApprovalFile: File | null
  agreeTerms: boolean
}

const tacomaZipCodes = [
  '98402', '98403', '98404', '98405', '98406', '98407', '98408', '98409',
  '98411', '98412', '98413', '98415', '98418', '98421', '98422', '98424',
  '98431', '98433', '98443', '98444', '98445', '98446', '98447', '98465',
  '98466', '98467', '98498'
]

export default function BuyerSignupForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phoneNumber: '',
    zipCodes: [],
    budget: 250000,
    homeType: '',
    minBedrooms: '',
    minBathrooms: '',
    minSqft: '',
    proxToMainSt: '',
    minGarageSpaces: '',
    views: '',
    additionalDwellingUnit: false,
    houseCondition: '',
    homeColor: '',
    garden: false,
    porch: false,
    yardSize: '',
    hotTubAndPool: false,
    haveRepresentation: false,
    preApprovalFile: null,
    agreeTerms: false
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }))
  }

  const handleSliderChange = (value: number[]) => {
    setFormData(prev => ({ ...prev, budget: value[0] }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({ ...prev, preApprovalFile: e.target.files![0] }))
    }
  }

  const handleZipCodeToggle = (zipCode: string) => {
    setFormData(prev => {
      const newZipCodes = prev.zipCodes.includes(zipCode)
        ? prev.zipCodes.filter(zip => zip !== zipCode)
        : [...prev.zipCodes, zipCode]
      return { ...prev, zipCodes: newZipCodes }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input id="phoneNumber" name="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleInputChange} required />
              </div>
              <Button onClick={() => setStep(prev => prev + 1)}>Next</Button>
            </div>
          </>
        )
      case 2:
        return (
          <>
            <Label>Select Zip Codes</Label>
            <div className="grid grid-cols-4 gap-2 mt-2">
              {tacomaZipCodes.map((zipCode) => (
                <Button
                  key={zipCode}
                  variant={formData.zipCodes.includes(zipCode) ? "default" : "outline"}
                  onClick={() => handleZipCodeToggle(zipCode)}
                  className="p-1 text-xs"
                >
                  {zipCode}
                </Button>
              ))}
            </div>
            <Button onClick={() => setStep(prev => prev + 1)} className="mt-4">Next</Button>
          </>
        )
      case 3:
        return (
          <>
            <div className="space-y-4">
              <div>
                <Label>Budget: ${formData.budget.toLocaleString()}</Label>
                <Slider
                  min={100000}
                  max={1000000}
                  step={10000}
                  value={[formData.budget]}
                  onValueChange={handleSliderChange}
                  className="my-4"
                />
              </div>
              <div>
                <Label>Home Type</Label>
                <Select onValueChange={(value) => handleSelectChange('homeType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Home Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="singleFamily">Single Family</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                    <SelectItem value="condo">Condo</SelectItem>
                    <SelectItem value="multiFamily">Multi-Family</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Minimum Bedrooms</Label>
                <Select onValueChange={(value) => handleSelectChange('minBedrooms', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Minimum Bedrooms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Minimum Bathrooms</Label>
                <Select onValueChange={(value) => handleSelectChange('minBathrooms', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Minimum Bathrooms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="1.5">1.5</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="2.5">2.5+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Minimum Square Footage</Label>
                <Select onValueChange={(value) => handleSelectChange('minSqft', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Minimum Square Footage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="500">500 sqft</SelectItem>
                    <SelectItem value="1000">1000 sqft</SelectItem>
                    <SelectItem value="1500">1500 sqft</SelectItem>
                    <SelectItem value="2000">2000+ sqft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={() => setStep(prev => prev + 1)}>Next</Button>
            </div>
          </>
        )
      case 4:
        return (
          <>
            <div className="space-y-4">
              <div>
                <Label>Proximity to Main Street</Label>
                <Select onValueChange={(value) => handleSelectChange('proxToMainSt', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Proximity to Main Street" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="walking">Walking Distance</SelectItem>
                    <SelectItem value="short">Short Drive</SelectItem>
                    <SelectItem value="medium">Medium Drive</SelectItem>
                    <SelectItem value="far">Far</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Minimum Garage Spaces</Label>
                <Select onValueChange={(value) => handleSelectChange('minGarageSpaces', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Minimum Garage Spaces" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">No Garage</SelectItem>
                    <SelectItem value="1">1 Car</SelectItem>
                    <SelectItem value="2">2 Cars</SelectItem>
                    <SelectItem value="3">3+ Cars</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Views</Label>
                <Select onValueChange={(value) => handleSelectChange('views', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Views" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Preference</SelectItem>
                    <SelectItem value="water">Water View</SelectItem>
                    <SelectItem value="mountain">Mountain View</SelectItem>
                    <SelectItem value="city">City View</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="additionalDwellingUnit"
                  checked={formData.additionalDwellingUnit}
                  onCheckedChange={(checked: boolean) => handleCheckboxChange('additionalDwellingUnit', checked)}
                />
                <Label htmlFor="additionalDwellingUnit">Additional Dwelling Unit</Label>
              </div>
              <div>
                <Label>House Condition</Label>
                <Select onValueChange={(value) => handleSelectChange('houseCondition', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="House Condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New Construction</SelectItem>
                    <SelectItem value="updated">Recently Updated</SelectItem>
                    <SelectItem value="good">Good Condition</SelectItem>
                    <SelectItem value="fixer">Fixer Upper</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={() => setStep(prev => prev + 1)}>Next</Button>
            </div>
          </>
        )
      case 5:
        return (
          <>
            <div className="space-y-4">
              <div>
                <Label>Home Color</Label>
                <Select onValueChange={(value) => handleSelectChange('homeColor', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Home Color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="white">White</SelectItem>
                    <SelectItem value="gray">Gray</SelectItem>
                    <SelectItem value="beige">Beige</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="garden"
                  checked={formData.garden}
                  onCheckedChange={(checked: boolean) => handleCheckboxChange('garden', checked)}
                />
                <Label htmlFor="garden">Garden</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="porch"
                  checked={formData.porch}
                  onCheckedChange={(checked: boolean) => handleCheckboxChange('porch', checked)}
                />
                <Label htmlFor="porch">Porch</Label>
              </div>
              <div>
                <Label>Yard Size</Label>
                <Select onValueChange={(value) => handleSelectChange('yardSize', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Yard Size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Yard</SelectItem>
                    <SelectItem value="small">Small Yard</SelectItem>
                    <SelectItem value="medium">Medium Yard</SelectItem>
                    <SelectItem value="large">Large Yard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hotTubAndPool"
                  checked={formData.hotTubAndPool}
                  onCheckedChange={(checked: boolean) => handleCheckboxChange('hotTubAndPool', checked)}
                />
                <Label htmlFor="hotTubAndPool">Hot Tub and Pool</Label>
              </div>
              <Button onClick={() => setStep(prev => prev + 1)}>Next</Button>
            </div>
          </>
        )
      case 6:
        return (
          <>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="haveRepresentation"
                  checked={formData.haveRepresentation}
                  onCheckedChange={(checked: boolean) => handleCheckboxChange('haveRepresentation', checked)}
                />
                <Label htmlFor="haveRepresentation">Do you have representation?</Label>
              </div>
              <div>
                <Label htmlFor="preApprovalFile">Upload Pre-Approval</Label>
                <Input
                  id="preApprovalFile"
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="agreeTerms"
                  checked={formData.agreeTerms}
                  onCheckedChange={(checked: boolean) => handleCheckboxChange('agreeTerms', checked)}
                />
                <Label htmlFor="agreeTerms">I agree to the terms and conditions</Label>
              </div>
              <Button onClick={handleSubmit} disabled={!formData.agreeTerms}>Submit</Button>
            </div>
          </>
        )
      default:
        return null
    }
  }

  const progressPercentage = (step / 6) * 100

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Buyer Signup</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-600 mb-4">Step {step} of 6</div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
          </div>
          <form onSubmit={handleSubmit}>
            {renderStep()}
          </form>
        </CardContent>
        <CardFooter>
          {step > 1 && (
            <Button onClick={() => setStep(prev => prev - 1)} variant="outline">
              Back
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}