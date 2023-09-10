import { useState, Fragment, useEffect, memo } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';
import {FormControlLabel, TextField } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';
import { useSnackbar } from 'notistack';
const API_URL = `${process.env.REACT_APP_API_URL}`;

type Ruas = {
    unit_id: number,
    ruas_name: string,
    long: number,
    km_awal: string,
    km_akhir: string,
    status: string,
    photo_url: string,
    doc_url: string
}

const data = {
    unit_id: 0,
    ruas_name: '',
    long: 0,
    km_awal: '',
    km_akhir: '',
    doc_url: '',
    photo_url: '',
    status: '1',
}


function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const ViewRuas:React.FC<
    {
        open: boolean,
        onClose: () => void,
        id?: Array<number> | undefined
    }
> =(
    {
        open,
        onClose,
        id
    }
) => {
    const [newRuas, setNewRuas] = useState<Ruas>(data)
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        getRuas()
    }, [id])

    const getRuas = async () => {
        try {
            if(!open) return
            const units = await axios(`${API_URL}/ruas/${id![0]}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            if(units.status === 200){
                setNewRuas(units.data.data)
            }
        } catch (error) {
            enqueueSnackbar('Failed get detail', { variant: "error"});
        }
    }

  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={onClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        maxWidth={false}
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          View Ruas
        </DialogTitle>
        <DialogContent>
          <div className='flex flex-col gap-4 w-auto'>
            <div className='flex justify-center content-center	items-center gap-8 w-auto'>
                <label htmlFor="name" className='w-40'>Unit</label>
                <div className='w-96' >
                <TextField 
                    disabled
                    id="outlined-basic" 
                    label='Unit Id' 
                    variant="outlined" 
                    className='w-96'
                    value={newRuas.ruas_name}
                />
                </div>
                
            </div>

            <div className='flex justify-center content-center	items-center gap-8 w-auto'>
                <label htmlFor="name" className='w-40'>Nama Ruas</label>
                <TextField 
                    disabled
                    id="outlined-basic" 
                    label="Nama Ruas" 
                    variant="outlined" 
                    className='w-96'
                    value={newRuas.ruas_name}
                />
            </div>

            <div className='flex justify-center content-center	items-center gap-8 w-auto'>
                <label htmlFor="name" className='w-40'>Long</label>
                <TextField 
                    disabled
                    id="outlined-basic" 
                    label="long" 
                    name="numberformat"
                    variant="outlined" 
                    className='w-96'
                    value={newRuas.long}
                />
            </div>

            <div className='flex justify-center content-center	items-center gap-8 w-auto'>
                <label htmlFor="name" className='w-40'>Km Awal</label>
                <TextField 
                    disabled
                    id="outlined-basic" 
                    label="KM Awal" 
                    variant="outlined" 
                    className='w-96'
                    value={newRuas.km_awal}
                />
            </div>

            <div className='flex justify-center content-center	items-center gap-8 w-auto'>
                <label htmlFor="name" className='w-40'>Km Akhir</label>
                <TextField 
                    disabled
                    id="outlined-basic" 
                    label="KM Akhir" 
                    variant="outlined" 
                    className='w-96'
                    value={newRuas.km_akhir}
                />
            </div>

            <div className='flex justify-center content-center	items-center gap-8 w-auto'>
                <label htmlFor="name" className='w-40'>Status</label>
                <FormControlLabel  
                    control={
                        <Checkbox 
                            disabled
                            defaultChecked={newRuas.status === '1' ? true : false}
                        />}
                     className='w-96' label={newRuas.status === '1' ? 'Aktif': 'Tidak Aktif'} 
                />
            </div>

            <div className='flex justify-center content-center	items-center gap-8 w-auto'>
                <label htmlFor="name" className='w-40'>Foto</label>
                <TextField 
                    disabled
                    id="outlined-basic" 
                    label="Foto Url" 
                    variant="outlined" 
                    className='w-96'
                    value={newRuas.doc_url}
                />
            </div>
            <div className='flex justify-center content-center	items-center gap-8 w-auto'>
                <label htmlFor="name" className='w-40'>Document</label>
                <TextField 
                    disabled
                    id="outlined-basic" 
                    label="Document Url" 
                    variant="outlined" 
                    className='w-96'
                    value={newRuas.photo_url}
  
                />
            </div>
            
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export default memo(ViewRuas);
