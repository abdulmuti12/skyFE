"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, Upload } from "lucide-react"

interface CreditPerson {
  id: string
  name: string
  email: string
}

export function CreateFilmForm() {
  const [directors, setDirectors] = useState<CreditPerson[]>([])
  const [producers, setProducers] = useState<CreditPerson[]>([])
  const [keyCast, setKeyCast] = useState<CreditPerson[]>([])

  const addPerson = (type: "directors" | "producers" | "keyCast") => {
    const newPerson = { id: Date.now().toString(), name: "", email: "" }
    if (type === "directors") setDirectors([...directors, newPerson])
    else if (type === "producers") setProducers([...producers, newPerson])
    else setKeyCast([...keyCast, newPerson])
  }

  const removePerson = (type: "directors" | "producers" | "keyCast", id: string) => {
    if (type === "directors") setDirectors(directors.filter((p) => p.id !== id))
    else if (type === "producers") setProducers(producers.filter((p) => p.id !== id))
    else setKeyCast(keyCast.filter((p) => p.id !== id))
  }

  const updatePerson = (
    type: "directors" | "producers" | "keyCast",
    id: string,
    field: "name" | "email",
    value: string,
  ) => {
    if (type === "directors") {
      setDirectors(directors.map((p) => (p.id === id ? { ...p, [field]: value } : p)))
    } else if (type === "producers") {
      setProducers(producers.map((p) => (p.id === id ? { ...p, [field]: value } : p)))
    } else {
      setKeyCast(keyCast.map((p) => (p.id === id ? { ...p, [field]: value } : p)))
    }
  }

  return (
    <form className="space-y-8 max-w-4xl">
      {/* Project Information Section */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Project Information</h2>

        {/* Title and Project Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <Input placeholder="Enter your film title" className="bg-muted border-border" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Project Type</label>
            <Select>
              <SelectTrigger className="bg-muted border-border">
                <SelectValue placeholder="Select film category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="feature">Feature Film</SelectItem>
                <SelectItem value="short">Short Film</SelectItem>
                <SelectItem value="documentary">Documentary</SelectItem>
                <SelectItem value="animation">Animation</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Brief Synopsis */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Brief Synopsis</label>
          <Textarea placeholder="Enter brief synopsis" className="bg-muted border-border min-h-24 resize-none" />
        </div>

        {/* Website and Social Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Website</label>
            <Input placeholder="Enter url website" className="bg-muted border-border" />
            <p className="text-xs text-muted-foreground">www.skylaunch.com</p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">X</label>
            <Input placeholder="Enter link x" className="bg-muted border-border" />
            <p className="text-xs text-muted-foreground">x.com/skylaunch</p>
          </div>
        </div>

        {/* Facebook and Instagram */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Facebook</label>
            <Input placeholder="Enter link facebook" className="bg-muted border-border" />
            <p className="text-xs text-muted-foreground">facebook.com/skylaunch</p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Instagram</label>
            <Input placeholder="Enter link instagram" className="bg-muted border-border" />
            <p className="text-xs text-muted-foreground">instagram.com/skylaunch</p>
          </div>
        </div>
      </section>

      {/* Credits Section */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Credits</h2>

        {/* Directors */}
        <div className="space-y-4">
          <h3 className="font-medium">Directors</h3>
          <div className="space-y-3">
            {directors.map((director) => (
              <div key={director.id} className="grid grid-cols-1 md:grid-cols-2 gap-3 items-end">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground">Name</label>
                  <Input
                    placeholder="Enter Name"
                    value={director.name}
                    onChange={(e) => updatePerson("directors", director.id, "name", e.target.value)}
                    className="bg-muted border-border"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground">E-Mail</label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter Prior Credits"
                      value={director.email}
                      onChange={(e) => updatePerson("directors", director.id, "email", e.target.value)}
                      className="bg-muted border-border"
                    />
                    <button
                      type="button"
                      onClick={() => removePerson("directors", director.id)}
                      className="p-2 hover:bg-muted rounded-lg transition-colors flex-shrink-0"
                    >
                      <Trash2 className="w-5 h-5 text-destructive" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => addPerson("directors")}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add a Person
          </button>
        </div>

        {/* Producers */}
        <div className="space-y-4">
          <h3 className="font-medium">Producers</h3>
          <div className="space-y-3">
            {producers.map((producer) => (
              <div key={producer.id} className="grid grid-cols-1 md:grid-cols-2 gap-3 items-end">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground">Name</label>
                  <Input
                    placeholder="Enter Name"
                    value={producer.name}
                    onChange={(e) => updatePerson("producers", producer.id, "name", e.target.value)}
                    className="bg-muted border-border"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground">E-Mail</label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter Prior Credits"
                      value={producer.email}
                      onChange={(e) => updatePerson("producers", producer.id, "email", e.target.value)}
                      className="bg-muted border-border"
                    />
                    <button
                      type="button"
                      onClick={() => removePerson("producers", producer.id)}
                      className="p-2 hover:bg-muted rounded-lg transition-colors flex-shrink-0"
                    >
                      <Trash2 className="w-5 h-5 text-destructive" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => addPerson("producers")}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add a Person
          </button>
        </div>

        {/* Key Cast */}
        <div className="space-y-4">
          <h3 className="font-medium">Key Cast</h3>
          <div className="space-y-3">
            {keyCast.map((cast) => (
              <div key={cast.id} className="grid grid-cols-1 md:grid-cols-2 gap-3 items-end">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground">Name</label>
                  <Input
                    placeholder="Enter Name"
                    value={cast.name}
                    onChange={(e) => updatePerson("keyCast", cast.id, "name", e.target.value)}
                    className="bg-muted border-border"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground">E-Mail</label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter Prior Credits"
                      value={cast.email}
                      onChange={(e) => updatePerson("keyCast", cast.id, "email", e.target.value)}
                      className="bg-muted border-border"
                    />
                    <button
                      type="button"
                      onClick={() => removePerson("keyCast", cast.id)}
                      className="p-2 hover:bg-muted rounded-lg transition-colors flex-shrink-0"
                    >
                      <Trash2 className="w-5 h-5 text-destructive" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => addPerson("keyCast")}
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add a Person
          </button>
        </div>
      </section>

      {/* Specifications Section */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Specifications</h2>

        {/* Genres and Release Year */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Genres</label>
            <Input placeholder="Enter genres" className="bg-muted border-border" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Release Year</label>
            <Input placeholder="Enter release year (e.g., 2026)" className="bg-muted border-border" />
          </div>
        </div>

        {/* Running Time */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Running Time (in minutes)</label>
          <Input placeholder="Enter total duration (e.g., 120)" className="bg-muted border-border" />
        </div>

        {/* Creator's Initial Contribution and Target Funding */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Creator's Initial Contribution</label>
            <Select>
              <SelectTrigger className="bg-muted border-border">
                <SelectValue placeholder="Select %" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="25">25%</SelectItem>
                <SelectItem value="50">50%</SelectItem>
                <SelectItem value="75">75%</SelectItem>
                <SelectItem value="100">100%</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Define how much of the target amount you'll contribute upfront to kickstart your film's funding campaign.
              Minimum 50% is required to publish your project.
            </p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Target Funding Amount</label>
            <div className="flex gap-2">
              <Input placeholder="Enter target funding (e.g., 50,000)" className="bg-muted border-border" />
              <span className="flex items-center px-3 bg-muted border border-border rounded-lg text-sm font-medium whitespace-nowrap">
                USKY
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Set your total funding goal. You'll need to contribute at least 50% of this amount before your campaign
              goes live.
            </p>
          </div>
        </div>

        {/* Country of Origin and Country of Filming */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Country of Origin</label>
            <Select>
              <SelectTrigger className="bg-muted border-border">
                <SelectValue placeholder="Select Country of Origin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
                <SelectItem value="au">Australia</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Country of Filming</label>
            <Select>
              <SelectTrigger className="bg-muted border-border">
                <SelectValue placeholder="Select Country of Filming" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
                <SelectItem value="au">Australia</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Language and Style Film */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Language</label>
            <Select>
              <SelectTrigger className="bg-muted border-border">
                <SelectValue placeholder="Select film category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="spanish">Spanish</SelectItem>
                <SelectItem value="french">French</SelectItem>
                <SelectItem value="german">German</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Style Film</label>
            <Select>
              <SelectTrigger className="bg-muted border-border">
                <SelectValue placeholder="Select Film Color" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="color">Color</SelectItem>
                <SelectItem value="bw">Black & White</SelectItem>
                <SelectItem value="mixed">Mixed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Cover Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Cover Image Landscape</label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:bg-muted/50 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm font-medium">Choose file</p>
              <p className="text-xs text-muted-foreground">No file chosen</p>
              <p className="text-xs text-muted-foreground mt-2">
                Upload a high-quality poster or thumbnail that visually represents your film. (Recommended ratio 16:9)
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Cover Image Portrait</label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:bg-muted/50 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm font-medium">Choose file</p>
              <p className="text-xs text-muted-foreground">No file chosen</p>
              <p className="text-xs text-muted-foreground mt-2">
                Upload a high-quality poster or thumbnail that visually represents your film. (Recommended ratio 9:16)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-6 border-t border-border">
        <Button className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold rounded-full px-6 py-2 gap-2 flex-shrink-0 transition-colors">
               
                <span className="hidden sm:inline">Create Film</span>
                <span className="sm:hidden">Create</span>
              </Button>
        <Button
  variant="outline"
  className="bg-white text-black font-semibold rounded-full px-6 py-2 gap-2 hover:bg-gray-100 transition-colors"
>
  Cancel
</Button>

       
        
      </div>
    </form>
  )
}
