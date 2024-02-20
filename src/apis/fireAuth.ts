import { fireUser } from "apis";
import {
    Auth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
    UserInfo,
} from "firebase/auth";

class FireAuth {
    #auth: Auth | null = null;

    constructor(auth: Auth) {
        this.#auth = auth;
    }

    get currentUser() {
        return this.#auth?.currentUser;
    }

    logout() {
        this.#auth?.signOut();
    }

    async loginWithGoogle(): Promise<{
        user: UserInfo;
        token: string;
    } | null> {
        if (!this.#auth) throw new Error("Auth is not initialized");

        const provider = new GoogleAuthProvider();

        try {
            const result = await signInWithPopup(this.#auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            if (!credential) return null;

            const token = credential.accessToken;
            if (!token) return null;

            this.#saveUser(result.user);
            return {
                user: result.user,
                token,
            };
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    observeAuthState(callback: (user: UserInfo | null) => void) {
        if (!this.#auth) throw new Error("Auth is not initialized");
        onAuthStateChanged(this.#auth, callback);
    }

    async #saveUser(user: UserInfo) {
        const { email, uid, displayName, photoURL } = user;
        const _fireUser = fireUser(uid);
        await _fireUser.setDoc({
            email,
            uid,
            displayName,
            photoURL,
        });
    }
}

export default FireAuth;
