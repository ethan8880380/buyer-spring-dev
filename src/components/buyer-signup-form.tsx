'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const tacomaZipCodes = [
  '98402', '98403', '98404', '98405', '98406', '98407', '98408', '98409',
  '98411', '98412', '98413', '98415', '98418', '98421', '98422', '98424',
  '98431', '98433', '98443', '98444', '98445', '98446', '98447', '98465',
  '98466', '98467', '98498'
]

export function BuyerSignupFormComponent() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
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
                <div className="flex space-x-2 mt-2">
                  {['1+', '2+', '3+', '4+', '5+'].map((value) => (
                    <Button
                      key={value}
                      variant={formData.minBedrooms === value ? "default" : "outline"}
                      onClick={() => handleSelectChange('minBedrooms', value)}
                    >
                      {value}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <Label>Minimum Bathrooms</Label>
                <div className="flex space-x-2 mt-2">
                  {['1+', '1.5+', '2+', '2.5+', '3+'].map((value) => (
                    <Button
                      key={value}
                      variant={formData.minBathrooms === value ? "default" : "outline"}
                      onClick={() => handleSelectChange('minBathrooms', value)}
                    >
                      {value}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <Label>Minimum Square Footage</Label>
                <div className="flex space-x-2 mt-2">
                  {['500+', '1000+', '1500+', '2000+', '2500+'].map((value) => (
                    <Button
                      key={value}
                      variant={formData.minSqft === value ? "default" : "outline"}
                      onClick={() => handleSelectChange('minSqft', value)}
                    >
                      {value}
                    </Button>
                  ))}
                </div>
              </div>
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
                <div className="flex space-x-2 mt-2">
                  {['0+', '1+', '2+', '3+'].map((value) => (
                    <Button
                      key={value}
                      variant={formData.minGarageSpaces === value ? "default" : "outline"}
                      onClick={() => handleSelectChange('minGarageSpaces', value)}
                    >
                      {value}
                    </Button>
                  ))}
                </div>
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
            </div>
          </>
        )
      case 7:
        return (
          <>
            <Tabs defaultValue="terms" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="terms">Terms</TabsTrigger>
                <TabsTrigger value="overview">Overview</TabsTrigger>
              </TabsList>
              <TabsContent value="terms">
                <Card>
                  <CardHeader>
                    <CardTitle>Terms and Conditions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>By agreeing to these terms, you acknowledge that:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>The information provided is accurate to the best of your knowledge.</li>
                      <li>You authorize Buyer Spring to contact you regarding your home search.</li>
                      <li>Your information may be shared with relevant real estate professionals.</li>
                      <li>You understand that this is not a binding agreement to purchase a home.</li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="overview">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Selections</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1">
                      <li><strong>Budget:</strong> ${formData.budget.toLocaleString()}</li>
                      <li><strong>Home Type:</strong> {formData.homeType}</li>
                      <li><strong>Bedrooms:</strong> {formData.minBedrooms}</li>
                      <li><strong>Bathrooms:</strong> {formData.minBathrooms}</li>
                      <li><strong>Square Footage:</strong> {formData.minSqft}</li>
                      <li><strong>Zip Codes:</strong> {formData.zipCodes.join(', ')}</li>
                      <li><strong>Proximity to Main Street:</strong> {formData.proxToMainSt}</li>
                      <li><strong>Garage Spaces:</strong> {formData.minGarageSpaces}</li>
                      <li><strong>Views:</strong> {formData.views}</li>
                      <li><strong>Additional Dwelling Unit:</strong> {formData.additionalDwellingUnit ? 'Yes' : 'No'}</li>
                      <li><strong>House Condition:</strong> {formData.houseCondition}</li>
                      <li><strong>Home Color:</strong> {formData.homeColor}</li>
                      <li><strong>Garden:</strong> {formData.garden ? 'Yes' : 'No'}</li>
                      <li><strong>Porch:</strong> {formData.porch ? 'Yes' : 'No'}</li>
                      <li><strong>Yard Size:</strong> {formData.yardSize}</li>
                      <li><strong>Hot Tub and Pool:</strong> {formData.hotTubAndPool ? 'Yes' : 'No'}</li>
                      <li><strong>Have Representation:</strong> {formData.haveRepresentation ? 'Yes' : 'No'}</li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            <div className="mt-4 flex items-center space-x-2">
              <Checkbox
                id="agreeTerms"
                checked={formData.agreeTerms}
                onCheckedChange={(checked: boolean) => handleCheckboxChange('agreeTerms', checked)}
              />
              <Label htmlFor="agreeTerms">I agree to the terms and conditions</Label>
            </div>
          </>
        )
      default:
        return null
    }
  }

  const progressPercentage = (step / 7) * 100

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Buyer Signup</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-600 mb-4">Step {step} of 7</div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
          </div>
          <form onSubmit={handleSubmit}>
            {renderStep()}
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          {step > 1 && (
            <Button onClick={() => setStep(prev => prev - 1)} variant="outline">
              Back
            </Button>
          )}
          {step < 7 ? (
            <Button onClick={() => setStep(prev => prev + 1)} className={step === 1 ? "ml-auto" : ""}>
              Next
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={!formData.agreeTerms}>
              Submit
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}