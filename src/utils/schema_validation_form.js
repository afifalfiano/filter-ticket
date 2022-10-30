/* eslint-disable object-curly-newline */
import * as Yup from 'yup';

const SignUpSchema = Yup.object().shape({
  name: Yup.string().required('Wajb diisi'),
  email: Yup.string()
    .email('Email tidak valid.')
    .required('Wajib diisi.')
    .matches(/@citra/, 'Email harus menggunakan domain @citra'),
  password: Yup.string()
    .required('Wajib diisi.')
    .min(6, 'Password minimal 6 karakter.'),
  pop_id: Yup.string().required('Wajib diisi.'),
  role_id: Yup.string().required('Wajib diisi.'),
  password_confirmation: Yup.string()
    .required('Wajib diisi.')
    .oneOf([Yup.ref('password'), null], 'Password tidak cocok'),
});

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email tidak valid.')
    .required('Wajib diisi.')
    .matches(/@citra/, 'Email tidak sesuai.'),
  password: Yup.string()
    .required('Wajib diisi.')
    .min(6, 'Password minimal 6 karakter.'),
});

const FormBTSSchema = Yup.object().shape({
  nama_bts: Yup.string().required('Wajib diisi.'),
  nama_pic: Yup.string().required('Wajib diisi.'),
  nomor_pic: Yup.string().required('Wajib diisi.'),
  lokasi: Yup.string().required('Wajib diisi.'),
  pop_id: Yup.string().required('Wajib diisi.'),
  kordinat: Yup.string().required('Wajib diisi.'),
});

const ReplySchema = Yup.object().shape({
  balasan: Yup.string().required('Wajib diisi.'),
});

const ComplainFormSchema = Yup.object().shape({
  id_pelanggan: Yup.string().required('Wajib diisi.'),
  nama_pelanggan: Yup.string().required('Wajib diisi.'),
  pop_id: Yup.string().required('Wajib diisi.'),
  sumber: Yup.string().required('Wajib diisi.'),
  detail_sumber: Yup.string().required('Wajib diisi.'),
  nama_pelapor: Yup.string().required('Wajib diisi.'),
  nomor_pelapor: Yup.string().required('Wajib diisi.'),
  keluhan: Yup.string().required('Wajib diisi.'),
});

const RFOMasalFormSchema = Yup.object().shape({
  rfo_gangguan: Yup.string().required('Wajib diisi'),
});

const RFOSingleSchema = Yup.object().shape({
  problem: Yup.string().required('Wajib diisi.'),
  action: Yup.string().required('Wajib diisi.'),
  deskripsi: Yup.string().required('Wajib diisi.'),
  mulai_gangguan: Yup.string().optional(),
  selesai_gangguan: Yup.string().optional(),
  nomor_tiket: Yup.string().optional(),
  durasi: Yup.string().optional(),
  status: Yup.string().optional(),
});

const ProfileSchema = Yup.object().shape({
  pop_id: Yup.string().optional(),
  role_id: Yup.string().optional(),
  old_password: Yup.string().optional().min(6, 'Password minimal 6 karakter.'),
  password: Yup.string().optional().min(6, 'Password minimal 6 karakter.'),
  password_confirmation: Yup.string()
    .optional()
    .oneOf([Yup.ref('password'), null], 'Password tidak cocok'),
});

const RFOMasalSchema = Yup.object().shape({
  problem: Yup.string().required('Wajib diisi.'),
  action: Yup.string().required('Wajib diisi.'),
  deskripsi: Yup.string().required('Wajib diisi.'),
  mulai_gangguan: Yup.string().optional(),
  selesai_gangguan: Yup.string().optional(),
  nomor_tiket: Yup.string().optional(),
  durasi: Yup.string().optional(),
});

export {
  SignUpSchema,
  SignInSchema,
  FormBTSSchema,
  ReplySchema,
  ComplainFormSchema,
  RFOMasalFormSchema,
  RFOSingleSchema,
  ProfileSchema,
  RFOMasalSchema,
};
