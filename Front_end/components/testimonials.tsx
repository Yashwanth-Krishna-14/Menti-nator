import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { QuoteIcon } from "lucide-react"

// Sample testimonial data
const testimonials = [
  {
    id: 1,
    content:
      "The AI mentorship I received was transformative. My mentor provided practical guidance that helped me implement machine learning solutions in my startup.",
    author: "Alex Johnson",
    role: "CTO, TechStart",
    image: "https://th.bing.com/th/id/OIP.EQi-_Qd0W2Al1qw_MOD9LQHaE8?w=288&h=192&c=7&r=0&o=5&dpr=1.5&pid=1.7",
  },
  {
    id: 2,
    content:
      "The business consulting session gave me clarity on my startup's growth strategy. Within three months, we secured our first round of funding.",
    author: "Maria Garcia",
    role: "Founder, InnovateCo",
    image: "https://th.bing.com/th/id/OIP.VZ4IEnlbTJPk618ZOJMybQHaLu?w=198&h=314&c=7&r=0&o=5&dpr=1.5&pid=1.7",
  },
  {
    id: 3,
    content:
      "After just two career coaching sessions, I completely revamped my resume and interview approach. I landed my dream job at a top tech company within weeks.",
    author: "David Kim",
    role: "Software Engineer, BigTech Inc.",
    image: "https://th.bing.com/th/id/OIP.kbEd8h7UvunAjPndOswJ6wHaLc?w=201&h=310&c=7&r=0&o=5&dpr=1.5&pid=1.7",
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Our Clients Say</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Real success stories from professionals who've accelerated their growth through expert consultations
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-background">
              <CardContent className="p-6">
                <QuoteIcon className="h-8 w-8 text-primary/20 mb-4" />
                <p className="mb-6 text-md">{testimonial.content}</p>
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={testimonial.image} alt={testimonial.author} />
                    <AvatarFallback>
                      {testimonial.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

