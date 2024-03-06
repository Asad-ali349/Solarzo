import express from 'express';
import {
    createUser,
    GetUsers,
    UpdateUsers,
    DeleteUser,
    GetUserDetail,
    GetProfile,
    UpdateProfile,
    ChangePassword
} from '../controllers/users.js';
import auth from '../middlewares/auth.js';
import multer from 'multer';

const uploadfile=multer({
  storage:multer.diskStorage({
    destination:function(req,file,callback){  
      callback(null,'./uploads');
    },
    filename:function(req,file,callback){
      callback(null,Date.now()+"-"+file.originalname)
    }
  })
}).single('profile_image');




const router= express.Router();

router.post('/',uploadfile,createUser);
router.get('/',auth,GetUsers);
router.get('/profile',auth,GetProfile);
router.patch('/profile',uploadfile,auth,UpdateProfile);
router.get('/:id',auth,GetUserDetail);
// router.patch('/:id',uploadfile,auth,UpdateUsers);
router.delete('/:id',auth,DeleteUser);
router.patch('/change_password',auth,ChangePassword);

export default router;