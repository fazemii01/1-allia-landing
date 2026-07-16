import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}


export const ChevronDownIcon = ({ size = 24, strokeWidth = 2, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M6 9l6 6l6 -6"></path>
  </svg>
);


export const LoaderIcon = ({ size = 24, strokeWidth = 2, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 3a9 9 0 1 0 9 9"></path>
  </svg>
);


export const ChevronLeftIcon = ({ size = 24, strokeWidth = 3, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 6l-6 6l6 6"></path>
  </svg>
);


export const ChevronRightIcon = ({ size = 24, strokeWidth = 3, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9 6l6 6l-6 6"></path>
  </svg>
);


export const HomeIcon = ({ size = 24, strokeWidth = 2, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M5 12l-2 0l9 -9l9 9l-2 0"></path><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"></path>
  </svg>
);


export const EditIcon = ({ size = 24, strokeWidth = 2, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415"></path><path d="M16 5l3 3"></path>
  </svg>
);


export const CalendarIcon = ({ size = 24, strokeWidth = 2, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2l0 -12"></path><path d="M16 3v4"></path><path d="M8 3v4"></path><path d="M4 11h16"></path><path d="M11 16a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
  </svg>
);


export const ClipboardIcon = ({ size = 24, strokeWidth = 2, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"></path><path d="M9 5a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2"></path><path d="M9 12h6"></path><path d="M9 16h6"></path>
  </svg>
);


export const ChatIcon = ({ size = 24, strokeWidth = 2, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M8 9h8"></path><path d="M8 13h6"></path><path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12"></path>
  </svg>
);


export const CloseIcon = ({ size = 24, strokeWidth = 2, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 6l-12 12"></path><path d="M6 6l12 12"></path>
  </svg>
);


// Custom Illustrative Layanan Icons (Ibunda-style)
export const LayananIndividualIcon = ({ size = 48, ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {/* Soft circular background badge */}
    <circle cx="24" cy="24" r="20" fill="#E6F5F2" />
    
    {/* Outer Accent Circle */}
    <circle cx="24" cy="24" r="22" stroke="#BCE3DB" strokeWidth="1" strokeDasharray="3 3" />

    {/* Little yellow helper bubble with question mark */}
    <path d="M12 18C12 15.2386 14.2386 13 17 13H19C20.1046 13 21 13.8954 21 15V17C21 18.1046 20.1046 19 19 19H16.5L14 21.5V19C12.8954 19 12 18.1046 12 17V18Z" fill="#FFA500" opacity="0.9" />
    <path d="M15.5 15.5C15.5 15 16 14.5 16.5 14.5C17 14.5 17.5 15 17.5 15.5C17.5 16 16.5 16.2 16.5 16.7V17" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
    <circle cx="16.5" cy="18" r="0.6" fill="white" />

    {/* Head */}
    <circle cx="26" cy="21" r="5" stroke="#003847" strokeWidth="2" fill="white" />
    {/* Body / Shoulders */}
    <path d="M18 36C18 30.4772 21.5 27 26 27C30.5 27 34 30.4772 34 36" stroke="#003847" strokeWidth="2" strokeLinecap="round" />
    {/* Inner detail (earphones/hearing helper symbol to denote listening/counseling) */}
    <path d="M22 21C22 18.5 23.5 17 26 17C28.5 17 30 18.5 30 21" stroke="#3CAEA3" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="21" cy="21" r="1.5" fill="#3CAEA3" />
    <circle cx="31" cy="21" r="1.5" fill="#3CAEA3" />
  </svg>
);

export const LayananCoupleIcon = ({ size = 48, ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="24" cy="24" r="20" fill="#E6F5F2" />
    <circle cx="24" cy="24" r="22" stroke="#BCE3DB" strokeWidth="1" strokeDasharray="3 3" />
    
    {/* Orange Heart Bubble */}
    <path d="M20.5 11.2C21.3 9.6 23.5 9.6 24.3 11.2L24.8 12.2C25.3 13.2 24.6 14.5 23.5 14.5H21.3C20.2 14.5 19.5 13.2 20 12.2L20.5 11.2Z" fill="#FF735C" />
    <path d="M22.4 11.4C22.4 11.2 22.3 11.1 22.2 11C22 10.9 21.8 11 21.7 11.1C21.6 11.2 21.5 11.4 21.5 11.5C21.5 11.7 21.6 11.9 21.8 12C21.9 12.1 22.1 12.1 22.2 12C22.3 11.9 22.4 11.7 22.4 11.4Z" fill="white" />
    
    {/* Left Person */}
    <circle cx="19" cy="23" r="4.5" stroke="#003847" strokeWidth="2" fill="white" />
    <path d="M12 36C12 31.5 15 29 19 29C21.5 29 23.5 30.2 24.5 32" stroke="#003847" strokeWidth="2" strokeLinecap="round" />

    {/* Right Person */}
    <circle cx="29" cy="23" r="4.5" stroke="#003847" strokeWidth="2" fill="white" />
    <path d="M23.5 32C24.5 30.2 26.5 29 29 29C33 29 36 31.5 36 36" stroke="#003847" strokeWidth="2" strokeLinecap="round" />

    {/* Heart accent in center */}
    <path d="M24 28.5C24 28.5 22.5 27 22.5 25.8C22.5 24.8 23.3 24.2 24 25C24.7 24.2 25.5 24.8 25.5 25.8C25.5 27 24 28.5 24 28.5Z" fill="#FF735C" />
  </svg>
);

export const LayananFamilyIcon = ({ size = 48, ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="24" cy="24" r="20" fill="#E6F5F2" />
    <circle cx="24" cy="24" r="22" stroke="#BCE3DB" strokeWidth="1" strokeDasharray="3 3" />
    
    {/* Child in Center */}
    <circle cx="24" cy="25" r="3.5" stroke="#003847" strokeWidth="2" fill="#FFA500" />
    <path d="M19.5 36C19.5 32.5 21.5 31 24 31C26.5 31 28.5 32.5 28.5 36" stroke="#003847" strokeWidth="2" strokeLinecap="round" />

    {/* Father (Left) */}
    <circle cx="16" cy="21" r="4.5" stroke="#003847" strokeWidth="2" fill="white" />
    <path d="M10 36C10 31 12.5 27.5 16.5 27.5C17.8 27.5 19 28.2 19.8 29.3" stroke="#003847" strokeWidth="2" strokeLinecap="round" />

    {/* Mother (Right) */}
    <circle cx="32" cy="21" r="4.5" stroke="#003847" strokeWidth="2" fill="white" />
    <path d="M28.2 29.3C29 28.2 30.2 27.5 31.5 27.5C35.5 27.5 38 31 38 36" stroke="#003847" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const LayananMhcuIcon = ({ size = 48, ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="24" cy="24" r="20" fill="#FFF4DB" />
    <circle cx="24" cy="24" r="22" stroke="#FFE4A3" strokeWidth="1" strokeDasharray="3 3" />
    
    {/* Clipboard base */}
    <rect x="16" y="14" width="16" height="22" rx="2" stroke="#003847" strokeWidth="2" fill="white" />
    
    {/* Clip */}
    <rect x="20" y="11" width="8" height="5" rx="1.5" stroke="#003847" strokeWidth="2" fill="#FFA500" />
    
    {/* Lines & Checkmarks */}
    <line x1="20" y1="21" x2="28" y2="21" stroke="#003847" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="20" y1="26" x2="28" y2="26" stroke="#003847" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="20" y1="31" x2="25" y2="31" stroke="#003847" strokeWidth="1.5" strokeLinecap="round" />
    
    {/* Little colored tick mark */}
    <path d="M28.5 29.5L30 31L33.5 27.5" stroke="#3CAEA3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const LayananHipnoterapiIcon = ({ size = 48, ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="24" cy="24" r="20" fill="#E6F5F2" />
    <circle cx="24" cy="24" r="22" stroke="#BCE3DB" strokeWidth="1" strokeDasharray="3 3" />

    {/* Outline Open Hand */}
    <path d="M24 13C24 11.3 22.7 10 21 10C19.3 10 18 11.3 18 13V24.5C18 24.5 17 24 16.5 24C15 24 13.8 25.2 13.8 26.7C13.8 30.5 16 34.5 19.5 37.5C21.5 39.2 24.5 40 27.5 40C32.5 40 35 36.5 35 31.5V19.5C35 18 33.8 16.8 32.2 16.8C30.7 16.8 29.5 18 29.5 19.5V23M29.5 16.5C29.5 15 28.3 13.8 26.8 13.8C25.3 13.8 24.1 15 24.1 16.5V23" stroke="#003847" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="white" />
    
    {/* Hypnotic Spiral accent in palm */}
    <path d="M26.5 31C26.5 29.6 25.4 28.5 24 28.5C22.6 28.5 21.5 29.6 21.5 31C21.5 32.4 23 33.5 24.5 33.5C25.8 33.5 27.5 32.2 27.5 30.5C27.5 28.5 25 27 23.5 27.2" stroke="#FFA500" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const LayananOnlineIcon = ({ size = 48, ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="24" cy="24" r="20" fill="#E6F5F2" />
    <circle cx="24" cy="24" r="22" stroke="#BCE3DB" strokeWidth="1" strokeDasharray="3 3" />
    {/* Laptop base */}
    <path d="M12 33H36" stroke="#003847" strokeWidth="2" strokeLinecap="round" />
    <path d="M15 33L13 36H35L33 33" stroke="#003847" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    {/* Screen */}
    <rect x="15" y="16" width="18" height="13" rx="1.5" stroke="#003847" strokeWidth="2" fill="white" />
    {/* Video user symbol */}
    <circle cx="24" cy="21" r="2.5" stroke="#003847" strokeWidth="1.5" />
    <path d="M20 27C20 25 21.5 24 24 24C26.5 24 28 25 28 27" stroke="#003847" strokeWidth="1.5" strokeLinecap="round" />
    {/* Floating Chat Bubble */}
    <path d="M30 14.5C30 12 31.8 11 33.5 11C35.2 11 37 12 37 14.5C37 16.5 35 17 34 18L32 19.5V17.5C31 17.5 30 16 30 14.5Z" fill="#FFA500" />
  </svg>
);

export const LayananOfflineIcon = ({ size = 48, ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="24" cy="24" r="20" fill="#E6F5F2" />
    <circle cx="24" cy="24" r="22" stroke="#BCE3DB" strokeWidth="1" strokeDasharray="3 3" />
    {/* Office/Clinic Building */}
    <path d="M14 36V16C14 14.8954 14.8954 14 16 14H32C33.1046 14 34 14.8954 34 16V36" stroke="#003847" strokeWidth="2" strokeLinecap="round" />
    {/* Door */}
    <path d="M21 36V28H27V36" stroke="#003847" strokeWidth="2" strokeLinecap="round" />
    {/* Windows */}
    <rect x="18" y="18" width="4" height="4" rx="0.5" stroke="#003847" strokeWidth="1.5" fill="white" />
    <rect x="26" y="18" width="4" height="4" rx="0.5" stroke="#003847" strokeWidth="1.5" fill="white" />
    {/* Location Pin */}
    <path d="M24 10C24 10 21 7 21 5.5C21 3.5 22.5 2.5 24 4.5C25.5 2.5 27 3.5 27 5.5C27 7 24 10 24 10Z" fill="#FF735C" />
  </svg>
);

export const LayananCorporateIcon = ({ size = 48, ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="24" cy="24" r="20" fill="#EBF3FC" />
    <circle cx="24" cy="24" r="22" stroke="#C2DCFA" strokeWidth="1" strokeDasharray="3 3" />
    {/* Briefcase base */}
    <rect x="14" y="18" width="20" height="16" rx="2" stroke="#003847" strokeWidth="2" fill="white" />
    {/* Handle */}
    <path d="M20 18V14C20 12.8954 20.8954 12 22 12H26C27.1046 12 28 12.8954 28 14V18" stroke="#003847" strokeWidth="2" strokeLinecap="round" />
    {/* Lock/Badge */}
    <circle cx="24" cy="26" r="2" fill="#FFA500" stroke="#003847" strokeWidth="1" />
    {/* Heart accent (employee wellness) */}
    <path d="M28 29.5C28 29.5 26.5 28 26.5 26.8C26.5 25.8 27.3 25.2 28 26C28.7 25.2 29.5 25.8 29.5 26.8C29.5 28 28 29.5 28 29.5Z" fill="#FF735C" />
  </svg>
);

export const EdukasiCekIcon = ({ size = 48, ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="24" cy="24" r="20" fill="#E6F5F2" />
    <circle cx="24" cy="24" r="22" stroke="#BCE3DB" strokeWidth="1" strokeDasharray="3 3" />
    {/* Clipboard body */}
    <rect x="16" y="14" width="16" height="22" rx="2" stroke="#003847" strokeWidth="2" fill="white" />
    {/* Clip */}
    <rect x="21" y="11" width="6" height="4" rx="1" stroke="#003847" strokeWidth="2" fill="#FFA500" />
    {/* Lines & Checkmarks */}
    <path d="M20 22H28" stroke="#003847" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M20 27H28" stroke="#003847" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M20 32H25" stroke="#003847" strokeWidth="1.5" strokeLinecap="round" />
    {/* Pencil */}
    <path d="M30 25L32 23L34 25L32 27L30 25Z" fill="#FF735C" stroke="#003847" strokeWidth="1" />
  </svg>
);

export const EdukasiBukuIcon = ({ size = 48, ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="24" cy="24" r="20" fill="#FFF4DB" />
    <circle cx="24" cy="24" r="22" stroke="#FFE4A3" strokeWidth="1" strokeDasharray="3 3" />
    {/* Book Cover */}
    <path d="M15 14H30C31.5 14 33 15.5 33 17V33C33 34.5 31.5 35 30 35H15C13.5 35 13 33.5 13 32V17C13 15.5 13.5 14 15 14Z" stroke="#003847" strokeWidth="2" fill="white" />
    {/* Pages detail */}
    <line x1="16" y1="18" x2="28" y2="18" stroke="#003847" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="16" y1="23" x2="28" y2="23" stroke="#003847" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="16" y1="28" x2="25" y2="28" stroke="#003847" strokeWidth="1.5" strokeLinecap="round" />
    {/* Book bookmark */}
    <path d="M28 14V22L25.5 20L23 22V14" fill="#FF735C" />
  </svg>
);

export const EdukasiArtikelIcon = ({ size = 48, ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="24" cy="24" r="20" fill="#EBF3FC" />
    <circle cx="24" cy="24" r="22" stroke="#C2DCFA" strokeWidth="1" strokeDasharray="3 3" />
    {/* Document sheet */}
    <rect x="15" y="13" width="18" height="22" rx="2" stroke="#003847" strokeWidth="2" fill="white" />
    {/* Folder/Sheet folds */}
    <path d="M29 13L33 17" stroke="#003847" strokeWidth="2" />
    {/* Text lines */}
    <line x1="19" y1="19" x2="29" y2="19" stroke="#003847" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="19" y1="24" x2="29" y2="24" stroke="#003847" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="19" y1="29" x2="26" y2="29" stroke="#003847" strokeWidth="1.5" strokeLinecap="round" />
    {/* Floating little orange bubble */}
    <circle cx="31" cy="28" r="4.5" fill="#FFA500" stroke="#003847" strokeWidth="1" />
    <path d="M30 28H32" stroke="white" strokeWidth="1" />
  </svg>
);

export const EdukasiGaleriIcon = ({ size = 48, ...props }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="24" cy="24" r="20" fill="#FFEBE6" />
    <circle cx="24" cy="24" r="22" stroke="#FFD4C9" strokeWidth="1" strokeDasharray="3 3" />
    {/* Polaroid frame */}
    <rect x="15" y="14" width="18" height="20" rx="1.5" stroke="#003847" strokeWidth="2" fill="white" />
    {/* Picture inside */}
    <rect x="18" y="17" width="12" height="11" stroke="#003847" strokeWidth="1.5" fill="#E6F5F2" />
    {/* Mountain/landscape inside picture */}
    <path d="M19 26L22.5 22L25 24.5L28.5 20L29.5 21" stroke="#003847" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    {/* Little yellow sun */}
    <circle cx="21" cy="20" r="1.5" fill="#FFA500" />
  </svg>
);

