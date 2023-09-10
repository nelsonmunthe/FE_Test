import { Fragment, forwardRef, memo } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';


const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteRuas: React.FC<{open: boolean, handleClose: () => void}> = ({open, handleClose})  => {
    const onSubmitHandler = () => {
        return true
    }

  return (
    <Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Delete Ruas"}</DialogTitle>
        <DialogContent>
          <div className='w-96'>
            <DialogContentText id="alert-dialog-slide-description">
                Are you sure to delete this ruas?
            </DialogContentText>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onSubmitHandler}>Delete</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default memo(DeleteRuas);
