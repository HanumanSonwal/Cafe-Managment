"use client";
import React, { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function Order() {
  // Example state for dynamic data
  const [thisWeekAmount, setThisWeekAmount] = useState(1329);
  const [thisWeekIncrease, setThisWeekIncrease] = useState(25);
  const [thisMonthAmount, setThisMonthAmount] = useState(5329);
  const [thisMonthIncrease, setThisMonthIncrease] = useState(10);

  // Example useEffect for simulating data updates
  useEffect(() => {
    // Simulate fetching new data
    // This could be replaced with actual data fetching logic
    const fetchData = () => {
      // Example: Update this week's data
      setThisWeekAmount(1500);
      setThisWeekIncrease(30);

      // Example: Update this month's data
      setThisMonthAmount(6000);
      setThisMonthIncrease(15);
    };

    // Simulate data update after 5 seconds
    const timeout = setTimeout(fetchData, 5000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
      <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
        <CardHeader className="pb-3">
          <CardTitle>Your Orders</CardTitle>
          <CardDescription className="max-w-lg text-balance leading-relaxed">
            Introducing Our Dynamic Orders Dashboard for Seamless Management and
            Insightful Analysis.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button>Create New Order</Button>
        </CardFooter>
      </Card>
      <Card x-chunk="dashboard-05-chunk-1">
        <CardHeader className="pb-2">
          <CardDescription>This Week</CardDescription>
          <CardTitle className="text-4xl">${thisWeekAmount}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            +{thisWeekIncrease}% from last week
          </div>
        </CardContent>
        <CardFooter>
          <Progress value={thisWeekIncrease} aria-label={`${thisWeekIncrease}% increase`} />
        </CardFooter>
      </Card>
      <Card x-chunk="dashboard-05-chunk-2">
        <CardHeader className="pb-2">
          <CardDescription>This Month</CardDescription>
          <CardTitle className="text-4xl">${thisMonthAmount}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            +{thisMonthIncrease}% from last month
          </div>
        </CardContent>
        <CardFooter>
          <Progress value={thisMonthIncrease} aria-label={`${thisMonthIncrease}% increase`} />
        </CardFooter>
      </Card>
    </div>
  );
}

export default Order;
