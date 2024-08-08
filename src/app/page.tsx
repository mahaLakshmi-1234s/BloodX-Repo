"use client";

import Link from "next/link";
import React, {useState} from 'react';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormcontext } from "react-hook-form";
import { useForm} from "react-hook-form";
import axios from 'axios';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  // CardDescription,
  // CardHeader,
  // CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TableDemo } from "@/components/Cards/Cards/Table";


const formSchema = z.object({
  FirstName: z.string().min(1, 'First name is required'),
  LastName: z.string().min(1, 'Last name is required'),
  AgeGroup: z.string().min(2, 'Age group must be at least 2 characters'),
  BloodGroup: z.string().min(1, 'Blood group is required'),
  Gender: z.string().min(1, 'Gender is required'),
  PhoneNumber: z.string().min(8, 'Phone number must be at least 8 characters'),
  Location: z.string().min(1, 'Location is required'),
  Units: z.string().min(1, 'Units are required'),
  RequiredBefore: z.string().min(1, 'Required before date is required'),
  ReasonforRequirement: z.string().min(1, 'Reason for requirement is required'),
});

const MyFormComponent =() => {
  const [showModal, setShowModal] = useState(false);
  const form = useForm ({
    resolver: zodResolver(formSchema),
    defaultValues: {
      FirstName: "",
      LastName: "",
      AgeGroup:"",
      BloodGroup:"",
      Gender:"",
      PhoneNumber:"",
      Location:"",
      Units:"",
      RequiredBefore:"",
      ReasonforRequirement:"",



    },
  });

  const { handleSubmit, control } = form;

  const onSubmit = async (data) => {
    console.log(data);

    // Ensure the date is in yyyy-mm-dd format
    const formattedDate = new Date(data.RequiredBefore).toISOString().split('T')[0];

   
    const requestData ={
      FirstName: data.FirstName,
      LastName: data.LastName,
      AgeGroup: data.AgeGroup,
      BloodGroup: data.BloodGroup,
      Gender: data.gender,
      PhoneNumber: data.PhoneNumber,
      Location: data.Location,
      Units: data.Units,
      RequiredBefore: formattedDate,
      ReasonforRequirement: data.ReasonforRequirement,



    };

    try {
      const response = await axios.post('http://localhost:8084/BloodX/BloodRequest/Create', requestData);
      if (response.status === 201) {
        console.log('Form data sent successfully');
        setShowModal(true);
      } else {
        console.error('Error in form submission', response.status);
      }
    } catch (error) {
      console.error('Error in form submission', error);
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };



// export default function LoginForm() {
//   // 1. Define your form.
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       FirstName: "",
//       LastName: "",
//       AgeGroup: "",
//       BloodGroup: "",
//       Gender: "",
//       PhoneNumber: "",
//       Location: "",
//       Units: "",
//       RequiredBefore: "",
//       ReasonforRequirement: "",
//     },
//   });



//   // 2. Define a submit handler.
//   function onSubmit(values: z.infer<typeof formSchema>) {
//     // Do something with the form values.
//     // ✅ This will be type-safe and validated.
//     console.log(values);
//   }

  return (
    <Form>
      <main className="flex h-screen justify-center items-center">
       <Card className="mx-auto max-w-sm"> 
          
         <CardContent>
           <div className="grid gap-4">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <FormField
                      control={control}
                      name="FirstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Patient First Name" {...field} />
                          </FormControl>
                          <FormMessage>{form.formState.errors.FirstName?.message}</FormMessage>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2">
                    <FormField
                      control={control}
                      name="LastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name </FormLabel>
                          <FormControl>
                            <Input placeholder="Patient Last name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={control}
                    name="AgeGroup"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age Group</FormLabel>
                        <FormControl>
                          <Input placeholder="Age Group" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={control}
                    name="BloodGroup"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Blood Group</FormLabel>
                        <FormControl>
                          <Input placeholder="Blood Group" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>    
                <div className="grid gap-2">
                  <FormField
                    control={control}
                    name="Gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <FormControl>
                          <Input placeholder="Gender" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={control}
                    name="PhoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="Phone Number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={control}
                    name="Location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Units</FormLabel>
                        <FormControl>
                          <Input placeholder="Location" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={control}
                    name="Units"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Units </FormLabel>
                        <FormControl>
                          <Input placeholder="Units" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={control}
                    name="RequiredBefore"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Required Before </FormLabel>
                        <FormControl>
                          <Input placeholder="Required Before" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={control}
                    name="ReasonforRequirement"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reason for Requirement</FormLabel>
                        <FormControl>
                          <Input placeholder="Reason for Requirement" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                  <Button type="submit" className="w-full">
                    Submit
                  </Button>
                 {showModal && (
                   <div>
                    <p> Form submitted successfully!</p>
                    <button onClick={handleClose}>Close</button>
                    </div>
                 )}
               
              </form>
            </div>
          </CardContent> 
        </Card> 
      </main>
    </Form>
  );
};

export default MyFormComponent;