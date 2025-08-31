
import React from 'react';

interface IconProps {
    className?: string;
}

export const UploadIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
    </svg>
);

export const MagicWandIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.475 2.118 2.25 2.25 0 0 1-2.475-2.118c0-.496.167-.98.457-1.42l.708-1.063a2.25 2.25 0 0 0 .287-.947l-.708-1.063a2.25 2.25 0 0 0-1.995-1.421 2.25 2.25 0 0 0-1.42 1.995c-.135.59-.116 1.173.05 1.727l.21.524a2.25 2.25 0 0 1-1.487 2.734l-.21-.524a2.25 2.25 0 0 1 .52-1.727 2.25 2.25 0 0 1 2.734-1.487l.524.21a2.25 2.25 0 0 0 1.727-.05 2.25 2.25 0 0 0 1.422-1.995 2.25 2.25 0 0 0-2.118-2.475c-.655.064-1.28.39-1.756.83l-.708 1.063a2.25 2.25 0 0 1-.287.947l.708 1.063a2.25 2.25 0 0 1 1.42 1.995 2.25 2.25 0 0 1-2.475 2.118 2.25 2.25 0 0 1-2.475-2.118 2.25 2.25 0 0 1 2.118-2.475c.655-.064 1.28-.39 1.756-.83l.708-1.063a2.25 2.25 0 0 0 .287-.947l-.708-1.063a2.25 2.25 0 0 0-1.995-1.421 2.25 2.25 0 0 0-1.42 1.995c-.135.59-.116 1.173.05 1.727l.21.524a2.25 2.25 0 0 1-1.487 2.734l-.21-.524a2.25 2.25 0 0 1 .52-1.727 2.25 2.25 0 0 1 2.734-1.487l.524.21a2.25 2.25 0 0 0 1.727-.05 2.25 2.25 0 0 0 1.42-1.995 2.25 2.25 0 0 0-2.118-2.475 2.25 2.25 0 0 0-2.475 2.118c0 .496.167.98.457 1.42l.708 1.063a2.25 2.25 0 0 0 .287.947l-.708 1.063a2.25 2.25 0 0 0-1.995-1.421 2.25 2.25 0 0 0-1.42 1.995c-.135.59-.116 1.173.05 1.727l.21.524" />
    </svg>
);

export const LoadingSpinner: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className={className}>
        <radialGradient id="a12" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)">
            <stop offset="0" stopColor="currentColor"></stop>
            <stop offset=".3" stopColor="currentColor" stopOpacity=".9"></stop>
            <stop offset=".6" stopColor="currentColor" stopOpacity=".6"></stop>
            <stop offset=".8" stopColor="currentColor" stopOpacity=".3"></stop>
            <stop offset="1" stopColor="currentColor" stopOpacity="0"></stop>
        </radialGradient>
        <circle transform-origin="center" fill="none" stroke="url(#a12)" strokeWidth="15" strokeLinecap="round" strokeDasharray="200 1000" strokeDashoffset="0" cx="100" cy="100" r="70">
            <animateTransform type="rotate" attributeName="transform" calcMode="spline" dur="2s" values="360;0" keyTimes="0;1" keySplines="0 0 1 1" repeatCount="indefinite"></animateTransform>
        </circle>
        <circle transform-origin="center" fill="none" opacity=".2" stroke="currentColor" strokeWidth="15" strokeLinecap="round" cx="100" cy="100" r="70"></circle>
    </svg>
);
