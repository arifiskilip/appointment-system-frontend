export class ValidationMessages {
  branch = {
    name: {
      required: "'Branch' boş olmamalı.",
      minLength: "'Branch', 3 karakterden büyük veya eşit olmalıdır.",
      maxLength: "'Branch', 50 karakterden küçük veya eşit olmalıdır.",
    },
  };
  login = {
    email: {
      required: "'email' boş olmamalı.",
      minLength: "'email', 3 karakterden büyük veya eşit olmalıdır.",
      maxLength: "'email', 50 karakterden küçük veya eşit olmalıdır.",
      email: "Lütfen geçerli bir 'email' adresi giriniz.",
    },
    password: {
      required: "'şifre' boş olmamalı.",
      minLength: "'şifre', 3 karakterden büyük veya eşit olmalıdır.",
      maxLength: "'şifre', 50 karakterden küçük veya eşit olmalıdır.",
    },
  };
  forgotPassword = {
    email: {
      required: "'email' boş olmamalı.",
      email: "Lütfen geçerli bir 'email' adresi giriniz.",
    },
  };
  title = {
    unvan: {
      required: "'Title' boş olmamalı.",
      minLength: "'Title', 3 karakterden büyük veya eşit olmalıdır.",
      maxLength: "'Title', 20 karakterden küçük veya eşit olmalıdır.",
    },
  };
  register = {
    firstName: {
      required: 'Ad alanı zorunludur.',
      minlength: 'Ad en az 3 karakter olmalıdır.',
      maxlength: 'Ad en fazla 50 karakter olabilir.',
    },
    lastName: {
      required: 'Soyad alanı zorunludur.',
      minlength: 'Soyad en az 3 karakter olmalıdır.',
      maxlength: 'Soyad en fazla 50 karakter olabilir.',
    },
    email: {
      required: 'Email alanı zorunludur.',
      email: 'Geçerli bir email adresi girin.',
      minlength: 'Email en az 3 karakter olmalıdır.',
      maxlength: 'Email en fazla 50 karakter olabilir.',
    },
    phoneNumber: {
      required: 'Telefon numarası zorunludur.',
      checkPhone: 'Geçerli bir telefon numarası girin.',
    },
    password: {
      required: 'Şifre alanı zorunludur.',
      minlength: 'Şifre en az 6 karakter olmalıdır.',
      maxlength: 'Şifre en fazla 50 karakter olabilir.',
    },
    confirmPassword: {
      required: 'Şifreyi yeniden girin alanı zorunludur.',
      minlength: 'Şifreyi yeniden girin en az 6 karakter olmalıdır.',
      maxlength: 'Şifreyi yeniden girin en fazla 50 karakter olabilir.',
      match: 'Şifreler eşleşmiyor.',
    },
    bloodType: {
      required: 'Kan grubu alanı zorunludur.',
    },
    gender: {
      required: 'Cinsiyet alanı zorunludur.',
    },
    birthDate:{
      required:"Doğum yılı zorunludur."
    }
  };

  patientEdit={
    firstName: {
      required: 'Ad alanı zorunludur.',
      minlength: 'Ad en az 3 karakter olmalıdır.',
      maxlength: 'Ad en fazla 50 karakter olabilir.',
    },
    lastName: {
      required: 'Soyad alanı zorunludur.',
      minlength: 'Soyad en az 3 karakter olmalıdır.',
      maxlength: 'Soyad en fazla 50 karakter olabilir.',
    },
    phoneNumber: {
      required: 'Telefon numarası zorunludur.',
      checkPhone: 'Geçerli bir telefon numarası girin.',
    },
    password: {
      required: 'Şifre alanı zorunludur.',
      minlength: 'Şifre en az 6 karakter olmalıdır.',
      maxlength: 'Şifre en fazla 50 karakter olabilir.',
    },
    confirmPassword: {
      required: 'Şifreyi yeniden girin alanı zorunludur.',
      minlength: 'Şifreyi yeniden girin en az 6 karakter olmalıdır.',
      maxlength: 'Şifreyi yeniden girin en fazla 50 karakter olabilir.',
      match: 'Şifreler eşleşmiyor.',
    },
    bloodType: {
      required: 'Kan grubu alanı zorunludur.',
    },
    birthDate:{
      required:"Doğum yılı zorunludur."
    }
  }
}