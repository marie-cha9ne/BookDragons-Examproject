import React from 'react';

export function showToast(
  message: string,
  setter: React.Dispatch<React.SetStateAction<string | null>>
){
  setter(message);

  setTimeout(() => setter(null), 3000);
}