"use client"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import ProfileNavbar from "@/components/profile/ProfileNavbar"
import EditProfileForm from "./EditProfileForm"





export default  function UserProfilePage(){


 

  return (
    <div>
      <div>
        <ProfileNavbar/>
        <EditProfileForm/>
        
      </div>
    </div>
  )
}
































// "use client";
// import React, { useEffect, useState } from 'react';
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Globe, Eye, Copy, Twitter, Instagram, Facebook, Linkedin, Github, Youtube, Mail } from 'lucide-react';

// import { useRouter } from 'next/navigation';
// import { useToast } from '@/components/ui/use-toast';
// import Link from 'next/link';
// import EditProfileForm from '@/components/profile/EditProfileForm';
// import { Header } from '@/components/landing/Header';
// import { Footer } from '@/components/landing/Footer';
// import Loading from '@/loading';

// import { useKindeBrowserClient}  from '@kinde-oss/kinde-auth-nextjs/';

// // Function to get the appropriate icon for a social platform
// const getSocialIcon = (iconName: string) => {
//   const iconMap: Record<string, React.ReactNode> = {
//     Twitter: <Twitter className="w-5 h-5 mr-3 text-[#1DA1F2]" />,
//     Instagram: <Instagram className="w-5 h-5 mr-3 text-[#E1306C]" />,
//     Facebook: <Facebook className="w-5 h-5 mr-3 text-[#4267B2]" />,
//     Linkedin: <Linkedin className="w-5 h-5 mr-3 text-[#0077B5]" />,
//     Github: <Github className="w-5 h-5 mr-3 text-[#333]" />,
//     Youtube: <Youtube className="w-5 h-5 mr-3 text-[#FF0000]" />,
//     Mail: <Mail className="w-5 h-5 mr-3 text-[#EA4335]" />
//   };

//   return iconMap[iconName] || <Globe className="w-5 h-5 mr-3 text-blue-500" />;
// };

// const UserProfilePage = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const {user , isAuthenticated } = useKindeBrowserClient()
//   const router = useRouter();
//   const { toast } = useToast();
  
//   console.log(`this is the user from broweser client ${user}`)

//   // useEffect(() => {
//   // //   if (!isAuthenticated) {
//   // //     router.push('/login');
//   // //   }
//   // // }, [ router]);

//   // useEffect(() => {
//   //   // If no profile data exists, switch to editing mode
//   //   if (!isLoading && !profileData) {
//   //     setIsEditing(true);
//   //   }
//   // }, [profileData, isLoading]);

//   // if (status === 'loading' || isLoading) {
//   //   return <div><Loading/></div>;
//   // }

//   // if (!session) {
//   //   return null;
//   // }

//   return (    
//     <div className="min-h-screen bg-[linear-gradient(135deg,#fff5f0_0%,#ffe8f5_100%)]">
//       <Header />
//       <div className="py-12 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-sm mx-auto">
//           <div className="flex justify-end mb-4 space-x-2">
//             <Button onClick={() => {
//               const username = profileData?.username || (session?.user as { id: string })?.id;
//               navigator.clipboard.writeText(`${window.location.origin}/view/${username}`);
//               toast({
//                 title: "URL Copied!",
//                 description: "Your profile URL has been copied to the clipboard.",
//               });
//             }} className="bg-white/80 text-slate-800 hover:bg-white">
//               <Copy className="mr-2 h-4 w-4" /> Copy URL
//             </Button>
//             <Link href={`/view/${profileData?.username || (session?.user as { id: string })?.id}`}>
//               <Button className="bg-white/80 text-slate-800 hover:bg-white">
//                 <Eye className="mr-2 h-4 w-4" /> View
//               </Button>
//             </Link>
//             <Button onClick={() => setIsEditing(!isEditing)} className="bg-white/80 text-slate-800 hover:bg-white">
//               {isEditing ? 'View Profile' : 'Edit Profile'}
//             </Button>
//           </div>

//           {isEditing ? (
//             <EditProfileForm />
//           ) : (
//             profileData && (
//               <Card className="overflow-hidden bg-white/80 backdrop-blur shadow-2xl border-2 border-slate-200/50">
//                 <CardContent className="p-0">
//                   {/* Profile Header */}
//                   <div className="bg-[linear-gradient(135deg,#ff9a56_0%,#ff6b9d_100%)] p-8 text-center text-white">
//                     <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur mx-auto mb-4 flex items-center justify-center">
//                       <span className="text-2xl font-bold">{profileData.name?.charAt(0)}</span>
//                     </div>
//                     <h3 className="text-xl font-bold mb-2">{profileData.name}</h3>
//                     <p className="text-white/90 text-sm">{profileData.bio}</p>
//                     <Badge className="mt-2 bg-white/20 text-white border-white/30">
//                       @{profileData.username}
//                     </Badge>
//                   </div>
                  
//                   {/* Social Links */}
//                   {profileData.socials && profileData.socials.length > 0 && (
//                     <div className="p-6 pb-2">
//                       <h4 className="text-sm font-medium text-slate-500 mb-3">SOCIAL PROFILES</h4>
//                       <div className="space-y-3">
//                         {profileData.socials.map((social, index) => (
//                           <Button
//                             key={index}
//                             variant="outline"
//                             className="w-full justify-start h-12 bg-white/80 hover:bg-white border-2 border-slate-200/50 transition-all hover:border-primary hover:shadow-md hover:-translate-y-0.5"
//                             onClick={() => window.open(social.url, '_blank')}
//                           >
//                             {typeof social.icon === 'string' ? getSocialIcon(social.icon) : <Globe className="w-5 h-5 mr-3 text-blue-500" />}
//                             <span className="flex-1 text-left text-slate-700">
//                               {typeof social.icon === 'string' ? social.icon : 'Social Link'}
//                             </span>
//                           </Button>
//                         ))}
//                       </div>
//                     </div>
//                   )}
                  
//                   {/* Custom Links */}
//                   {profileData.links && profileData.links.length > 0 && (
//                     <div className="px-6 pb-6">
//                       <h4 className="text-sm font-medium text-slate-500 mb-3">MY LINKS</h4>
//                       <div className="space-y-3">
//                         {profileData.links.map((link, index) => (
//                           <Button
//                             key={index}
//                             variant="outline"
//                             className="w-full justify-start h-12 bg-white/80 hover:bg-white border-2 border-slate-200/50 transition-all hover:border-primary hover:shadow-md hover:-translate-y-0.5"
//                             onClick={() => window.open(link.url, '_blank')}
//                           >
//                             <Globe className="w-5 h-5 mr-3 text-blue-500" />
//                             <span className="flex-1 text-left text-slate-700">{link.title}</span>
//                           </Button>
//                         ))}
//                       </div>
//                     </div>
//                   )}
                  
//                   {/* Footer */}
//                   <div className="px-6 pb-6 text-center">
//                     <p className="text-xs text-slate-500">
//                       Created with HyperBIO ❤️
//                     </p>
//                   </div>
//                 </CardContent>
//               </Card>
//             )
//           )}
//           <Card className="mt-8 overflow-hidden bg-white/80 backdrop-blur shadow-2xl border-2 border-slate-200/50">
//             <CardContent className="p-6">
//               <h3 className="text-lg font-semibold text-slate-800 mb-4">Analytics</h3>
//               <div className="flex items-center justify-between">
//                 <span className="text-slate-600">Profile Views</span>
//                 <span className="font-bold text-slate-800">{profileData?.views || 0}</span>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default UserProfilePage;