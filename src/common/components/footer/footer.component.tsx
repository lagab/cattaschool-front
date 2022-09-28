import {
  Box,
  Grid,
  List,
  ListItem,
  ListSubheader,
  Typography,
} from '@mui/material';
import { BoxContainer } from '../core/core.component';

const Footer: React.FC = ({}) => {
  return (
    <Box
      sx={{ flexGrow: 1, borderTop: 1, borderColor: 'grey.200', py: '2rem' }}
    >
      <BoxContainer>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={6} md={3}>
            part1
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            part2
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <List>
              <ListSubheader>
                <Typography variant="h6">Links</Typography>
              </ListSubheader>

              <ListItem>
                <a href="/test" title="Titre du lien 1">
                  lien 1
                </a>
              </ListItem>
              <ListItem>
                <a href="/test" title="Titre du lien 2 ">
                  lien 2
                </a>
              </ListItem>
              <ListItem>
                <a href="/test" title="Titre du lien 3">
                  lien 3
                </a>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </BoxContainer>
      <BoxContainer sx={{}}>
        <Typography
          textAlign="center"
          variant="caption"
          sx={{ mt: '2rem', display: 'block' }}
        >
          Conformément à la Directive 2006/112/CE modifiée, à partir du
          01/01/2015, les prix TTC sont susceptibles de varier selon le pays de
          résidence du client (par défaut les prix TTC affichés incluent la TVA
          française en vigueur
        </Typography>
      </BoxContainer>
    </Box>
  );
};

export default Footer;
