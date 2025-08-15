import { authInstance } from "../api/axiosInstance";

// Yeni istifadəçi qeydiyyatı
async function userSignUp(user) {
  try {
    // Email mövcuddursa error at
    const res = await authInstance.get(`/users?email=${user.email}`);
    if (res.data.length) {
      throw new Error("This email is already registered");
    }

    // Yeni istifadəçi əlavə et
    const { data: newUser } = await authInstance.post(`/users`, {
      ...user,
      createdAt: new Date().toISOString(),
      lastLogin: null,
    });

    return newUser;
  } catch (err) {
    throw new Error(err.message || "Qeydiyyat zamanı xəta baş verdi");
  }
}

// Giriş
async function userLogin({ email, password }) {
  try {
    // Email ilə user-i tap
    const { data } = await authInstance.get(`/users?email=${email}`);
    if (!data.length) {
      throw new Error("Belə bir istifadəçi mövcud deyil");
    }

    const user = data[0];

    // Şifrə yoxla
    if (user.password !== password) {
      throw new Error("Şifrə yanlışdır");
    }

    // Son giriş tarixini yenilə
    await authInstance.patch(`/users/${user.id}`, {
      lastLogin: new Date().toISOString(),
    });

    return user;
  } catch (err) {
    throw new Error(err.message || "Giriş zamanı xəta baş verdi");
  }
}

// ADD THIS: Bütün istifadəçiləri gətir (Admin paneli üçün)
async function getAllUsers() {
  try {
    console.log('Fetching all users...');
    const { data } = await authInstance.get('/users');
    console.log('Fetched users:', data);
    
    // Make sure we return an array
    if (Array.isArray(data)) {
      return data;
    } else {
      console.warn('Expected array but got:', typeof data, data);
      return [];
    }
  } catch (err) {
    console.error('Error fetching all users:', err);
    throw new Error(err.message || "İstifadəçilər yüklənərkən xəta baş verdi");
  }
}

// ADD THIS: Specific user by ID (optional - for future use)
async function getUserById(userId) {
  try {
    const { data } = await authInstance.get(`/users/${userId}`);
    return data;
  } catch (err) {
    throw new Error(err.message || "İstifadəçi tapılmadı");
  }
}

// ADD THIS: Update user (optional - for future admin features)
async function updateUser(userId, updates) {
  try {
    const { data } = await authInstance.patch(`/users/${userId}`, updates);
    return data;
  } catch (err) {
    throw new Error(err.message || "İstifadəçi yenilənərkən xəta baş verdi");
  }
}

export { 
  userSignUp, 
  userLogin,
  getAllUsers,    // ADD THIS
  getUserById,    // ADD THIS (optional)
  updateUser      // ADD THIS (optional)
};