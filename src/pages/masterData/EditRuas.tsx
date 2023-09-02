import { useState, Fragment, ChangeEvent, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';
import { FormControl, FormControlLabel, Input, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import NewRuas from '../../models/NewRuas';
const API_URL = `${process.env.REACT_APP_API_URL}`;

const data = {
    unit_id: 0,
    ruas_name: '',
    long: 0,
    km_awal: '',
    km_akhir: '',
    photo: '',
    file: '',
    status: '1',
}

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: 48 * 4.5 + 8,
            width: 250,
        },
    },
};


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

const EditRuas:React.FC<
    {
        open: boolean,
        onClose: () => void
    }
> =(
    {
        open,
        onClose
    }
) => {
    const [newRuas, setNewRuas] = useState<NewRuas>(data)
    const [units, setUnits] = useState([0]);
    const [fileList, setFileList] = useState<File | null>(null);
    const [photo, setPhoto] = useState<File | null>(null);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        let refresh = true;
        if(refresh){
            getUnit()
        }
        return() => {
            refresh = false;
        }
    }, [])


    const onChangeRuasName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewRuas((prev: NewRuas) => {
            return{
                ...prev,
                ruas_name: event.target.value
            }
        })
    };

    const onChangeLong = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewRuas((prev: any) => {
            return{
                ...prev,
                long: event.target.value
            }
        })
    }

    const onChangeKmAwal = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewRuas((prev: NewRuas) => {
            return{
                ...prev,
                km_awal: event.target.value
            }
        })
    }

    const onChangeKmAkhir = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewRuas((prev: NewRuas) => {
            return{
                ...prev,
                km_akhir: event.target.value
            }
        })
    }
    

    const onChangeUnit = (event: SelectChangeEvent<unknown>) => {
        setNewRuas((prev: any) => {
            return{
                ...prev,
                unit_id: event.target.value
            }
        })
    };

    const onChangeStatus = (event: any) => {
        setNewRuas((prev: NewRuas) => {
            return{
                ...prev,
                status: prev.status === '1' ? '0' : '1'
            }
        })
    }

    const onSubmitHandler = async () => {
        try {
            if(!newRuas.unit_id || !newRuas.ruas_name || !newRuas.long || !newRuas.km_awal || !newRuas.km_akhir || !newRuas.status || !fileList || !photo){
                return enqueueSnackbar('Invalid Form', { variant: "error"});
            }
            
            const body = {
                unit_id: newRuas.unit_id,
                ruas_name: newRuas.ruas_name,
                long: newRuas.long,
                km_awal: newRuas.km_awal,
                km_akhir: newRuas.km_akhir,
                status: newRuas.status,
                file: fileList,
                photo: photo
            }
            
            const posting = await axios.post(`${API_URL}/ruas`, body, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "multipart/form-data",
                }
            })
            if(posting.status === 201) {
                onClose()
                return enqueueSnackbar('Add New Ruas Succeed', { variant: "success"});
            }
            else return enqueueSnackbar('something went wrong', { variant: "error"});
        } catch (error: any) {
            return enqueueSnackbar(error.response.statusText, { variant: "error"});
        }
    };

    const getUnit = async () => {
        try {
            const units = await axios(`${API_URL}/unit`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })

            if(units.status === 200){
                const unitId = [];
                for(let item of units.data.data){
                    unitId.push(item.id)
                }
                setUnits(unitId)
            }
        } catch (error: any) {
            return enqueueSnackbar(error.response.statusText, { variant: "error"});
        }
    }

    const onChangeFoto = (event: ChangeEvent<HTMLInputElement>) => {
        if(event.target.files){
            setPhoto(event.target.files[0]);
        }
        
    };

    const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
        if(event.target.files){
            setFileList(event.target.files[0]);
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
          Add New Ruas
        </DialogTitle>
        <DialogContent>
          <div className='flex flex-col gap-4 w-auto'>
            <div className='flex justify-center content-center	items-center gap-8 w-auto'>
                <label htmlFor="name" className='w-40'>Unit</label>
                <div className='w-96' >
                    <FormControl required fullWidth >
                        <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            value={newRuas.unit_id}
                            onChange={onChangeUnit}
                            input={<OutlinedInput label="Unit" />}
                            MenuProps={MenuProps}
                        >
                            {units.map((unit) => (
                                <MenuItem key={unit} value={unit} >
                                    {unit}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                
            </div>

            <div className='flex justify-center content-center	items-center gap-8 w-auto'>
                <label htmlFor="name" className='w-40'>Nama Ruas</label>
                <TextField 
                    id="outlined-basic" 
                    label="Nama Ruas" 
                    variant="outlined" 
                    className='w-96'
                    value={newRuas.ruas_name}
                    onChange={onChangeRuasName}
                />
            </div>

            <div className='flex justify-center content-center	items-center gap-8 w-auto'>
                <label htmlFor="name" className='w-40'>Long</label>
                <TextField 
                    id="outlined-basic" 
                    label="long" 
                    name="numberformat"
                    variant="outlined" 
                    className='w-96'
                    value={newRuas.long}
                    onChange={onChangeLong}
                />
            </div>

            <div className='flex justify-center content-center	items-center gap-8 w-auto'>
                <label htmlFor="name" className='w-40'>Km Awal</label>
                <TextField 
                    id="outlined-basic" 
                    label="KM Awal" 
                    variant="outlined" 
                    className='w-96'
                    value={newRuas.km_awal}
                    onChange={onChangeKmAwal}
                />
            </div>

            <div className='flex justify-center content-center	items-center gap-8 w-auto'>
                <label htmlFor="name" className='w-40'>Km Akhir</label>
                <TextField 
                    id="outlined-basic" 
                    label="KM Akhir" 
                    variant="outlined" 
                    className='w-96'
                    value={newRuas.km_akhir}
                    onChange={onChangeKmAkhir}
                />
            </div>

            <div className='flex justify-center content-center	items-center gap-8 w-auto'>
                <label htmlFor="name" className='w-40'>Status</label>
                <FormControlLabel  
                    control={
                        <Checkbox 
                            onChange={onChangeStatus}
                            defaultChecked={newRuas.status === '1' ? true : false}
                        />}
                     className='w-96' label={newRuas.status === '1' ? 'Aktif': 'Tidak Aktif'} 
                />
            </div>

            <div className='flex justify-center content-center	items-center gap-8 w-auto'>
                <label htmlFor="name" className='w-40'>Foto</label>
                <Input 
                    id="outlined-basic"            
                    type={"file"}
                    className='w-96'
                    onChange={onChangeFoto}
                    inputProps={{accept:"images"}}
                /> 
            </div>
            <div className='flex justify-center content-center	items-center gap-8 w-auto'>
                <label htmlFor="name" className='w-40'>Document</label>
                 <Input 
                    id="outlined-basic" 
                    type="file" 
                    className='w-96'
                    onChange={onChangeFile}
                />
            </div>
            
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onSubmitHandler}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export default EditRuas;
