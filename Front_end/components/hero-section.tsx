import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function HeroSection() {
  return (
    <section className="py-20 hero-gradient">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Connect with Industry Experts for Personalized Consultations
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Book 1-on-1 sessions with top professionals in Tech & AI, Business, and Career Coaching to accelerate
                your growth.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" asChild>
                <Link href="/experts">Find a Mentor</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/become-expert">Become a Mentor</Link>
              </Button>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              {/* <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="inline-block rounded-full overflow-hidden border-2 border-background h-8 w-8">
                    <Image src="https://imgs.search.brave.com/i88yAfJcLZ7bBc11Vzm_Pz6nP6EzTHIFxoWEdXLb_TI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTE3/ODY5OTI5OC9waG90/by90ZWFjaGVyLWdp/dmluZy1hLWxlY3R1/cmUtaW4tYW1waGl0/aGVhdHJlLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1aMldX/QkxUem9hQTVic2Z5/SV9HSVdxTV9yM0U2/eVRFeEZYLXA1bTRr/ZnhjPQ" alt={`User ${i}`} width={32} height={32} />
                  </div>
                ))}
              </div> */}
              <div className="text-muted-foreground">
                <span className="font-medium">4,000+</span> consultations completed
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-[650px] aspect-video overflow-hidden rounded-xl">
              <Image
                src="https://imgs.search.brave.com/hhuTCl7cgJP095vyon-Uu2a3oRPDFELYh69Wl7498To/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9tYXR1cmUtYnVz/aW5lc3NtYW4tbWVu/dG9yaW5nLXlvdW5n/ZXItY29sbGVhZ3Vl/LXdvcmtpbmctbGFw/dG9wLWRlc2tfMTIx/ODI3MC02MjQ2Lmpw/Zz9zZW10PWFpc19o/eWJyaWQ?height=32&width=32"
                alt="Expert consultation"
                width={650}
                height={650}
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

