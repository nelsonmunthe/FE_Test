
import {memo} from 'react'
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

const ViewFoto: React.FC<
    {
        open: boolean,
        fotoUrl: string,
        onClose: () => void
    }
> = (
    {
        open,
        fotoUrl,
        onClose
    }
) => {
    const BootstrapDialog = styled(Dialog)(({ theme }) => ({
        '& .MuiDialogContent-root': {
          padding: theme.spacing(2),
        },
        '& .MuiDialogActions-root': {
          padding: theme.spacing(1),
        },
    }));

    return(
        <BootstrapDialog
            onClose={onClose}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Foto Ruas
            </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                <CloseIcon />
                </IconButton>
            <DialogContent dividers>
                <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            image={fotoUrl}
                            alt="green iguana"
                        />
                    </CardActionArea>
                </Card>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={onClose}> Close </Button>
            </DialogActions>
        </BootstrapDialog>
    )
};

export default memo(ViewFoto);