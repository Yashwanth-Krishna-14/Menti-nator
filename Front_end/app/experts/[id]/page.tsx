"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Star, MessageSquare, Video, CheckCircle, CalendarIcon } from "lucide-react";
import ExpertAvailability from "@/components/expert-availability";
import ExpertReviews from "@/components/expert-reviews";

const MentorProfile = () => {
  const [mentor, setMentor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchMentor() {
      try {
        const response = await fetch("/api/mentor");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        console.log("Mentor Data:", data);

        if (!data || Object.keys(data).length === 0) {
          throw new Error("Mentor data is empty");
        }

        setMentor(data);
      } catch (error) {
        console.error("Failed to fetch mentor:", error);
        setMentor(null);
      } finally {
        setLoading(false);
      }
    }

    fetchMentor();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!mentor) return <p>Mentor not found</p>;

  const specialties = (() => {
    try {
      return Array.isArray(mentor.specialties)
        ? mentor.specialties
        : JSON.parse(mentor.specialties || "[]");
    } catch (error) {
      console.error("Error parsing specialties:", error);
      return [];
    }
  })();

  return (
    <div className="container py-10">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <Avatar className="h-24 w-24 md:h-32 md:w-32">
              <AvatarImage src={mentor.image || "/default-avatar.png"} alt={mentor.name || "Mentor"} />
              <AvatarFallback>
                {mentor?.name
                  ? mentor.name.split(" ").map((n: string) => n[0]).join("")
                  : "?"}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2 flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">{mentor.name}</h1>
                  <p className="text-muted-foreground">{mentor.title}</p>
                </div>
                <Badge variant="outline" className="w-fit">
                  {mentor.category}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="ml-1 font-medium">{mentor.rating}</span>
                </div>
                <span className="text-muted-foreground">({mentor.reviews ?? 0} reviews)</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {specialties.map((specialty: string) => (
                  <Badge key={specialty} variant="secondary">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <Tabs defaultValue="about">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="sessions">Sessions</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="about" className="space-y-4 mt-6">
              <h2 className="text-xl font-semibold mb-2">Bio</h2>
              <p className="text-muted-foreground">{mentor.bio}</p>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6">
              <ExpertReviews expertId={mentor.id} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default MentorProfile;
