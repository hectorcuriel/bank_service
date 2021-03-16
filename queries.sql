SELECT c.name, act.accounttypename, balance
 FROM customeraccount ca
INNER JOIN customer c ON ca.customer = c.id
INNER JOIN accounttype act ON ca.accounttype = act.id

SELECT c.name, act.accounttypename, mt.movementname, m.amount, m.fee, m.total
 FROM movement m
 INNER JOIN movementtype mt ON m.movementtype = mt.id
INNER JOIN customeraccount ca ON m.customeraccount = ca.id
INNER JOIN customer c ON ca.customer = c.id
INNER JOIN accounttype act ON ca.accounttype = act.id