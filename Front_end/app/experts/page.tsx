"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StarIcon, Search, Filter, Sliders } from "lucide-react";
import Link from "next/link";
import ExpertFilters from "@/components/expert-filters";
import { supabase } from "@/lib/supabase"; // Import Supabase client

export default function ExpertsPage() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [filteredMentors, setFilteredMentors] = useState<Mentor[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [sortOption, setSortOption] = useState<SortOption | "">("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  interface Mentor {
    id: number;
    name: string;
    title: string;
    category: string;
    rating: number;
    reviews: number;
    hourlyRate: number;
    image: string;
    specialties: string | string[];
  }

  type SortOption = "rating" | "reviews" | "hourlyRate";

  // Fetch mentors from Supabase
  useEffect(() => {
    async function fetchMentors() {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase.from("mentors").select("*");
        if (error) throw error;
        setMentors(data);
        setFilteredMentors(data);
      } catch (err) {
        setError("Failed to fetch experts.");
      } finally {
        setLoading(false);
      }
    }
    fetchMentors();
  }, []);

  // Handle filtering
  const handleApplyFilters = (filtered: Mentor[]) => {
    setFilteredMentors(filtered);
  };

  // Handle search
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = mentors.filter((mentor) => {
      const specialties = Array.isArray(mentor.specialties)
        ? mentor.specialties
        : typeof mentor.specialties === "string"
        ? [mentor.specialties]
        : [];
      return (
        mentor.name.toLowerCase().includes(query) ||
        mentor.title.toLowerCase().includes(query) ||
        specialties.some((specialty) =>
          specialty.toLowerCase().includes(query)
        )
      );
    });
    setFilteredMentors(filtered);
  };

  // Handle sorting
  const handleSort = (option: SortOption) => {
    setSortOption(option);
    const sorted = [...filteredMentors].sort((a, b) => {
      if (option === "rating") return b.rating - a.rating;
      if (option === "reviews") return b.reviews - a.reviews;
      if (option === "hourlyRate") return b.hourlyRate - a.hourlyRate;
      return 0;
    });
    setFilteredMentors(sorted);
  };

  if (loading) return <p>Loading experts...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container py-10">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Find an Expert</h1>
          <p className="text-muted-foreground">
            Browse our curated list of industry experts ready to help you
            achieve your goals
          </p>
        </div>

        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by name, expertise, or keywords..."
              className="pl-8"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => handleSort("rating")}
          >
            <Sliders className="h-4 w-4" />
            <span>Sort by Rating</span>
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => handleSort("reviews")}
          >
            <Sliders className="h-4 w-4" />
            <span>Sort by Reviews</span>
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => handleSort("hourlyRate")}
          >
            <Sliders className="h-4 w-4" />
            <span>Sort by Hourly Rate</span>
          </Button>
        </div>

        {showFilters && (
          <div className="lg:block">
            <ExpertFilters onApplyFilters={handleApplyFilters} />
          </div>
        )}

        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredMentors.map((mentor) => {
              const specialties = Array.isArray(mentor.specialties)
                ? mentor.specialties
                : typeof mentor.specialties === "string"
                ? [mentor.specialties]
                : [];
              return (
                <Card
                  key={mentor.id}
                  className="expert-card transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={mentor.image} alt={mentor.name} />
                          <AvatarFallback>
                            {mentor.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">{mentor.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {mentor.title}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline">{mentor.category}</Badge>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center space-x-1">
                        <StarIcon className="h-4 w-4 fill-primary text-primary" />
                        <span className="font-medium">{mentor.rating}</span>
                        <span className="text-muted-foreground text-sm">
                          ({mentor.reviews} reviews)
                        </span>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {specialties.map((specialty: string) => (
                          <Badge key={specialty} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4 text-sm">
                      <span className="font-semibold">${mentor.hourlyRate}</span>
                      <span className="text-muted-foreground"> / hour</span>
                    </div>
                  </CardContent>
                  <CardFooter className="px-6 pb-6 pt-0">
                    <Button className="w-full" asChild>
                      <Link href={`/experts/${mentor.id}`}>View Profile</Link>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}