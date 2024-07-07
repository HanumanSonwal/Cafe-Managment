"use client";
import { useEffect, useState } from "react";
import { File, ListFilter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrdersData from "../Order.json";

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filters, setFilters] = useState({
    fulfilled: true,
    declined: false,
    refunded: false,
  });

  useEffect(() => {
    setOrders(OrdersData);

    const filtered = orders.filter((order) => {
      if (filters.fulfilled && order.Status === "Fulfilled") {
        return true;
      }
      if (filters.declined && order.Status === "Declined") {
        return true;
      }
      if (filters.refunded && order.Status === "Refunded") {
        return true;
      }
      return false;
    });
    setFilteredOrders(filtered);
  }, [filters, orders]);

  const handleFilterChange = (filter) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filter]: !prevFilters[filter],
    }));
  };

  return (
    <Tabs defaultValue="week">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="week">Week</TabsTrigger>
          <TabsTrigger value="month">Month</TabsTrigger>
          <TabsTrigger value="year">Year</TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-7 gap-1 text-sm">
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={filters.fulfilled}
                onCheckedChange={() => handleFilterChange("fulfilled")}
              >
                Fulfilled
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filters.declined}
                onCheckedChange={() => handleFilterChange("declined")}
              >
                Declined
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={filters.refunded}
                onCheckedChange={() => handleFilterChange("refunded")}
              >
                Refunded
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" variant="outline" className="h-7 gap-1 text-sm">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only">Export</span>
          </Button>
        </div>
      </div>
      <TabsContent value="week">
        <Card>
          <CardHeader className="px-7">
            <CardTitle>Orders</CardTitle>
            <CardDescription>Recent orders from your store.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Index</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead className="hidden sm:table-cell">Type</TableHead>
                  <TableHead className="hidden sm:table-cell">Status</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order, index) => (
                  <TableRow
                    key={index}
                    className={index % 2 === 0 ? "bg-accent" : ""}
                  >
                    <TableCell>{order.index}</TableCell>
                    <TableCell>
                      <div className="font-medium">{order.Customer}</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        {order.Email}
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {order.Type}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge
                        className="text-xs"
                        variant={
                          order.Status === "Fulfilled" ? "secondary" : "outline"
                        }
                      >
                        {order.Status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {order.Date}
                    </TableCell>
                    <TableCell className="text-right">{order.Amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

export default OrderList;
