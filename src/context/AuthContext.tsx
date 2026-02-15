'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
    User,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    updateProfile,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp, FieldValue, Timestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

interface UserProfile {
    uid: string;
    name: string;
    email: string;
    phone?: string;
    role: 'customer' | 'owner' | 'admin';
    profilePicture?: string;
    address?: string;
    verificationStatus?: string;
    createdAt?: FieldValue | Timestamp;
}

interface AuthContextType {
    user: User | null;
    userProfile: UserProfile | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string, name: string, role: string, extra?: Record<string, unknown>) => Promise<void>;
    logout: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            setUser(firebaseUser);
            if (firebaseUser) {
                const docRef = doc(db, 'users', firebaseUser.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUserProfile(docSnap.data() as UserProfile);
                }
            } else {
                setUserProfile(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const login = async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password);
    };

    const signup = async (email: string, password: string, name: string, role: string, extra?: Record<string, unknown>) => {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(cred.user, { displayName: name });

        const profile: UserProfile = {
            uid: cred.user.uid,
            name,
            email,
            role: role as 'customer' | 'owner' | 'admin',
            createdAt: serverTimestamp(),
            ...extra,
        };

        await setDoc(doc(db, 'users', cred.user.uid), profile);
        setUserProfile(profile);
    };

    const logout = async () => {
        await signOut(auth);
        setUserProfile(null);
    };

    const resetPassword = async (email: string) => {
        await sendPasswordResetEmail(auth, email);
    };

    return (
        <AuthContext.Provider value={{ user, userProfile, loading, login, signup, logout, resetPassword }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
